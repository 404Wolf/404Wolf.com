import { addResource, resourceUrl } from "@/utils/aws";
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "prisma/prisma-client";

const prisma = new PrismaClient();

interface Request extends NextApiRequest {
    headers: {
        id: string;
    };
    body: {
        title: string;
        filename: string;
        data: string;
        type: "image" | "markdown";
        postId: string;
        description?: string;
        mimetype: string;
    };
}

export default async function handler(req: Request, res: NextApiResponse) {
    req.body = JSON.parse(req.body as unknown as string)

    if (req.method === "POST") {
        try {
            await addResource(
                req.body.filename,
                req.body.data,
                req.body.type === "image" ? "b64" : "str",
                req.body.mimetype
            );
            await prisma.resource.create({
                data: {
                    id: req.headers.id,
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
        } catch (error) {
            res.status(500).json({
                status: "Error",
                message: "An error occurred while adding the resource",
            });
        }
    } else {
        res.status(405).json({ status: "Error", message: "Method not allowed" });
    }
}
