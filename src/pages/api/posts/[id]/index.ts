import {authOptions} from "@/pages/api/auth/[...nextauth]";
import s3 from "@/utils/aws";
import type {NextApiRequest, NextApiResponse} from "next";
import {getServerSession} from "next-auth";
import {PrismaClient} from "prisma/prisma-client";
import {auth} from "@/auth";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (typeof req.query.id !== "string") {
        res.status(400).json({
            status: "Error",
            message: "ID is required to create, delete, or fetch a post.",
        });
        return;
    }
    const id = req.query.id;
    if (!(await auth(req, res)))
        return;

    switch (req.method) {
        case "GET": {
            const includeResources = req.headers.resources
                ? req.headers.resource === "true"
                : false;
            const post = await prisma.post.findUnique({
                where: {
                    id: id,
                },
                include: {
                    resources: includeResources,
                },
            });
            if (post === null) {
                res.status(404).json({
                    status: "Error",
                    message: "Unable to locate post",
                });
                return;
            } else {
                res.status(200).json({
                    status: "Success",
                    post: post,
                });
            }
        }

        case "POST": {
            const markdownId = req.body.markdown?.id || `${id}_00001`;

            if (
                await prisma.post.findUnique({
                    where: {id: id},
                })
            ) {
                res.status(403).json({
                    status: "Error",
                    message: `Post "${id}" already exists.`,
                });
                return;
            }

            let resourceData = null;
            try {
                resourceData = await s3.getResource(`${markdownId}.md`, "utf-8");
            } catch {
            }

            const resourceEntry = await prisma.resource.findUnique({
                where: {id: markdownId},
            });

            if (resourceEntry && resourceData !== "" && resourceData !== null) {
                res.status(400).json({
                    status: "Error",
                    message: `Markdown file "${markdownId}.md" already exists with text content.`,
                });
                return;
            }

            try {
                await prisma.post.create({
                    data: {
                        id: id,
                        title: req.body.title || id,
                        description: req.body.description || "",
                        markdown: req.body.markdown?.id || `${id}_00001`,
                        covers: req.body.covers,
                        type: req.body.type,
                        date: req.body.date,
                        tags: req.body.tags,
                        notes: req.body.notes,
                        resources: resourceEntry
                            ? {
                                connect: [{id: markdownId}],
                            }
                            : {
                                create: [
                                    {
                                        id: markdownId,
                                        title: "Post Markdown",
                                        filename: markdownId + ".md",
                                        url: s3.resourceUrl(markdownId + ".md"),
                                        type: "markdown",
                                    },
                                ],
                            },
                    },
                });
            } catch {
                res.status(400).json({
                    status: "Error",
                    message: "Failed to create post. Invalid request body.",
                });
                return;
            }

            // If we detected that the markdown file exists and is empty and
            // they have passed data, update its contents. If it didn't exist create
            // it with an empty string.
            if ((req.body.markdown && req.body.markdown.data) || !resourceEntry || !resourceData)
                if (
                    !(await s3.addResource(
                        markdownId + ".md",
                        req.body.markdown?.data || "",
                        "str",
                        "text/plain"
                    ))
                ) {
                    await prisma.post.delete({where: {id: id}});
                    res.status(400).json({
                        status: "Error",
                        message: "Failed to add post to database.",
                    });
                    return;
                }

            res.status(200).json({
                status: "Success",
                message: "Post successfully added",
            });
            return;
        }

        case "DELETE": {
            const post = await prisma.post.findUnique({
                where: {
                    id: id,
                },
                include: {
                    resources: true,
                },
            });
            if (post === null) {
                res.status(404).json({
                    status: "Error",
                    message: "Unable to locate post to delete",
                });
                return;
            }
            await prisma.post.delete({
                where: {
                    id: post.id,
                },
            });
            await Promise.all(
                post.resources.map((resource) => {
                    try {
                        s3.removeResource(resource.filename);
                    } catch {
                    }
                })
            );
            res.status(200).json({
                status: "Success",
                message: "Post successfully deleted",
            });
            return;
        }

        case "PUT": {
            const post = await prisma.post.findUnique({
                where: {
                    id: id,
                },
            });
            if (post === null) {
                res.status(404).json({
                    status: "Error",
                    message: "Unable to locate post to update",
                });
                return;
            }

            if (req.body.markdown) {
                await s3.addResource(
                    `${req.body.markdown.id}.md`,
                    req.body.markdown.data,
                    "str",
                    "text/plain"
                );
            }

            await prisma.post.update({
                where: {
                    id: post.id,
                },
                data: {
                    id: req.body.id,
                    title: req.body.title,
                    description: req.body.description,
                    markdown: req.body.markdown?.id,
                    covers: req.body.covers,
                    type: req.body.type,
                    date: req.body.date,
                    tags: req.body.tags,
                    editedAt: new Date(),
                    notes: req.body.notes,
                },
            });
            res.status(200).json({
                status: "Success",
                message: "Post successfully updated",
            });
            return;
        }

        default: {
            res.status(405).json({
                status: "Error",
                message: "Invalid request method.",
            });
        }
    }
}
