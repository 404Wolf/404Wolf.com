import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "prisma/prisma-client";

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
            message: `Unable to locate post ${id}`,
        });
    } else {
        res.status(200).json({
            status: "Success",
            resources: post.resources,
        });
    }
}
