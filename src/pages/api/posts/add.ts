import { addResource, resourceUrl } from "@/utils/aws";
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "prisma/prisma-client";

const prisma = new PrismaClient();

interface Request extends NextApiRequest {
    headers: {
        id: string;
    };
    body: {
        id: string;
        title: string;
        description: string;
        markdown: {
            id: string;
            data: string;
        };
        covers: string[];
        type: string;
        date: string;
        tags: string;
        notes: string;
    };
}

export default async function handler(req: Request, res: NextApiResponse) {
    if (req.method === "PUT") {
        try {
            await prisma.post.create({
                data: {
                    id: req.headers.id,
                    title: req.body.title,
                    description: req.body.description,
                    markdown: `${req.body.id}_00001`,
                    covers: req.body.covers,
                    type: req.body.type,
                    editedAt: new Date(Date.now()),
                    notes: req.body.notes,
                    resources: {
                        create: [
                            {
                                id: `${req.body.id}_00001`,
                                title: "Post Markdown",
                                filename: `${req.body.id}_0001.md`,
                                url: resourceUrl(`${req.body.id}_0001.md`),
                                type: "markdown",
                            },
                        ],
                    },
                },
            });
            await addResource(
                `${req.body.id}_00001.md`,
                req.body.markdown.data,
                "str",
                "text/plain"
            );

            res.status(200).json({
                status: "Success",
                message: "Post successfully added",
            });
        } catch (error) {
            res.status(500).json({
                status: "Error",
                message: "An error occurred while adding the post",
            });
        }
    } else {
        res.status(405).json({ status: "Error", message: "Method not allowed" });
    }
}
