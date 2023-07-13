import { addResource, resourceUrl } from "@/utils/aws";
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "prisma/prisma-client";

const prisma = new PrismaClient();

interface Request extends NextApiRequest {
    body: {
        id: string;
        title: string;
        filename: string;
        data: string;
        type: "image" | "markdown";
        postId: string;
        description?: string;
    };
}

export default async function handler(req: Request, res: NextApiResponse) {
    if (req.method === "POST") {
        try {
            await addResource(
                req.body.filename,
                req.body.data,
                req.body.type === "image" ? "b64" : "str"
            );
            await prisma.resource.create({
                data: {
                    id: req.body.id,
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
