import { addResource, resourceUrl } from "@/utils/aws";
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "prisma/prisma-client";

const prisma = new PrismaClient();

interface Request extends NextApiRequest {
    headers: {
        id: string;
    };
}

export default async function handler(req: Request, res: NextApiResponse) {
    if (req.method === "GET") {
        const post = await prisma.post.findUnique({
            where: {
                id: req.headers.id,
            },
            include: {
                resources: true
            }
        });
        if (post === null) {
            res.status(404).json({
                status: "Error",
                message: "Unable to locate post",
            });
            return;
        }
        else {
            res.status(200).json({
                status: "Success",
                post: post
            })
        }
    }
}
