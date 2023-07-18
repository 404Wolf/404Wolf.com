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
        description?: string;
        markdown?: {
            id: string;
            data: string;
        };
        covers?: string[];
        type?: string;
        date?: string;
        tags?: string;
        notes?: string;
    };
}

export default async function handler(req: Request, res: NextApiResponse) {
    if (req.method === "PUT") {
        try {
            const post = await prisma.post.findUnique({
                where: {
                    id: req.headers.id,
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
        } catch (error) {
            res.status(500).json({
                status: "Error",
                message: `An error occurred while updating the post (error: ${error})`,
            });
        }
    } else {
        res.status(405).json({ status: "Error", message: "Method not allowed" });
    }
}
