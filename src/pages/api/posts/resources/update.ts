import { addResource, resourceUrl } from "@/utils/aws";
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "prisma/prisma-client";

const prisma = new PrismaClient();

interface Request extends NextApiRequest {
    headers: {
        id: string;
    };
    body: {
        id?: string;
        title?: string;
        filename?: string;
        base64Data?: string;
        type?: "image" | "markdown";
        description?: string;
        mimetype: string;
    };
}

export default async function handler(req: Request, res: NextApiResponse) {
    req.body = JSON.parse(req.body as unknown as string) as Request["body"]
    if (req.method === "PATCH") {
        try {            
            const resource = await prisma.resource.findUnique({
                where: {
                    id: req.headers.id,
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
                    id: req.headers.id,
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
            res.status(200).json({
                status: "Success",
                message: "Resource successfully updated",
            });
        } catch (error) {
            res.status(500).json({
                status: "Error",
                message: "An error occurred while updating the resource",
            });
        }
    } else {
        res.status(405).json({ status: "Error", message: "Method not allowed" });
    }
}
