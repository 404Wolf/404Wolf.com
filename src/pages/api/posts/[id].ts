import { addResource, removeResource, resourceUrl } from "@/utils/aws";
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "prisma/prisma-client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (typeof req.query.id !== "string")
        res.status(400).json({
            status: "Error",
            message: "ID is required to create, delete, or fetch a post.",
        });
    const id = req.query.id as string;

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
            req.body = JSON.parse(req.body as unknown as string);
            console.log(req.headers.id);
            const markdownFilename = req.body.markdown?.id || `${req.headers.id}_00001`;

            await prisma.post.create({
                data: {
                    id: id,
                    title: req.body.title,
                    description: req.body.description,
                    markdown: req.body.markdown?.id || `${req.headers.id}_00001`,
                    covers: req.body.covers,
                    type: req.body.type,
                    editedAt: new Date(Date.now()),
                    notes: req.body.notes,
                    resources: {
                        create: [
                            {
                                id: markdownFilename,
                                title: "Post Markdown",
                                filename: markdownFilename + ".md",
                                url: resourceUrl(markdownFilename + ".md"),
                                type: "markdown",
                            },
                        ],
                    },
                },
            });
            console.log(
                await prisma.post.findUnique({
                    where: { id: id },
                    include: { resources: true },
                })
            );
            await addResource(
                markdownFilename + ".md",
                req.body.markdown?.data || "",
                "str",
                "text/plain"
            );

            res.status(200).json({
                status: "Success",
                message: "Post successfully added",
            });
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
                post.resources.map((resource) => removeResource(resource.filename))
            );
            res.status(200).json({
                status: "Success",
                message: "Post successfully deleted",
            });
        }

        case "UPDATE": {
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
                await addResource(
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
        }
    }
}
