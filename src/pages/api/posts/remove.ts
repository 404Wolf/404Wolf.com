import { addResource, removeResource } from "@/utils/aws";
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "prisma/prisma-client";

const prisma = new PrismaClient();

interface Request extends NextApiRequest {
    headers: {
        id: string;
    };
}

export default async function handler(req: Request, res: NextApiResponse) {
    if (req.method === "DELETE") {
        try {
            const post = await prisma.post.findUnique({
                where: {
                    id: req.headers.id,
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
        } catch (error) {
            res.status(500).json({
                status: "Error",
                message: "An error occurred while removing the post",
            });
        }
    } else {
        res.status(405).json({ status: "Error", message: "Method not allowed" });
    }
}
