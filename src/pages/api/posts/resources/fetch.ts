import { addResource, getResource, resourceUrl } from "@/utils/aws";
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "prisma/prisma-client";

const prisma = new PrismaClient();

interface Request extends NextApiRequest {
    headers: {
        id: string;
        data: "true" | "false";
    };
}

export default async function handler(req: Request, res: NextApiResponse) {
    if (req.method === "GET") {
        try {
            const resource = await prisma.resource.findUnique({
                where: {
                    id: req.headers.id,
                },
            });
            if (!resource) {
                res.status(404).json({
                    status: "Error",
                    message: "Unable to locate resource",
                });
                return;
            }

            const encoding = resource.type === "markdown" ? "utf-8" : "base64";
            const data =
                req.headers.data === "true"
                    ? await getResource(resource.filename, encoding)
                    : null;

            res.status(200).json({
                status: "Success",
                resource: {
                    ...resource,
                    data: data,
                    encoding: encoding,
                },
            });
        } catch (error) {
            res.status(500).json({
                status: "Error",
                message: "An error occurred while fetching the resource",
            });
        }
    } else {
        res.status(405).json({ status: "Error", message: "Method not allowed" });
    }
}
