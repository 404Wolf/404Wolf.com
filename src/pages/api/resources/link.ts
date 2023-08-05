import { addResource, getResourceDownloadLink, removeResource } from "@/utils/aws";
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
        const resource = await prisma.resource.findUnique({
            where: {
                id: req.headers.id,
            },
        });
        if (resource === null) {
            res.status(404).json({
                status: "Error",
                message: "Unable to locate resource to fetch link for",
            });
            return;
        } else {
            res.status(200).json({
                status: "Success",
                url: await getResourceDownloadLink(resource.filename),
            });
        }
    }
}
