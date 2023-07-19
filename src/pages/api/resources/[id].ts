import { addResource, getResource, removeResource, resourceUrl } from "@/utils/aws";
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
    const { searchParams: params } = new URL(req.url as string)

    switch (req.method) {
        case "GET": {
            const resource = await prisma.resource.findUnique({
                where: {
                    id: id,
                },
            });
            if (!resource) {
                res.status(404).json({
                    status: "Error",
                    message: "Unable to locate resource",
                });
                return;
            }

            const encoding = resource.type === "markdown" ? "utf-8" : "base64";
            const data =
                req.headers.data === "true"
                    ? await getResource(resource.filename, encoding)
                    : null;

            res.status(200).json({
                status: "Success",
                resource: {
                    ...resource,
                    data: data,
                    encoding: encoding,
                },
            });
        }

        case "POST": {
            await addResource(
                req.body.filename,
                req.body.data,
                req.body.type === "image" ? "b64" : "str",
                req.body.mimetype
            );
            await prisma.resource.create({
                data: {
                    id: id,
                    title: req.body.title,
                    filename: req.body.filename,
                    url: resourceUrl(req.body.filename),
                    type: req.body.type,
                    description: req.body.description,
                    post: {
                        connect: { id: req.body.postId },
                    },
                },
            });
            res.status(200).json({
                status: "Success",
                message: "Resource successfully added",
            });
        }

        case "DELETE": {
            const resource = await prisma.resource.findUnique({
                where: {
                    id: id,
                },
            });
            if (resource === null) {
                res.status(404).json({
                    status: "Error",
                    message: "Unable to locate resource to delete",
                });
                return;
            }

            await prisma.resource.delete({
                where: {
                    id: resource.id,
                },
            });
            await removeResource(resource.filename);
            res.status(200).json({
                status: "Success",
                message: "Resource successfully deleted",
            });
        }

        case "PUT": {
            const resource = await prisma.resource.findUnique({
                where: {
                    id: id,
                },
            });
            if (resource === null) {
                res.status(404).json({
                    status: "Error",
                    message: "Unable to locate resource to update",
                });
                return;
            }

            if (req.body.base64Data)
                await addResource(
                    req.body.filename || resource.filename,
                    req.body.base64Data,
                    "b64",
                    req.body.mimetype
                );
            await prisma.resource.update({
                where: {
                    id: id,
                },
                data: {
                    id: req.body.id,
                    title: req.body.title,
                    filename: req.body.filename,
                    url: req.body.filename ? resourceUrl(req.body.filename) : undefined,
                    type: req.body.type,
                    description: req.body.description,
                },
            });
        }
    }
}
