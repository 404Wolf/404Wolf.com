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
        description: string;
        markdown?: {
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
    if (req.method === "POST") {
        req.body = JSON.parse(req.body as unknown as string);
        console.log(req.headers.id);
        const markdownFilename = req.body.markdown?.id || `${req.headers.id}_00001`;

        await prisma.post.create({
            data: {
                id: req.headers.id,
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
                where: { id: req.headers.id },
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
}
