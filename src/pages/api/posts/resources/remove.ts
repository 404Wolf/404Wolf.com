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
            const resource = await prisma.resource.findUnique({
                where: {
                    id: req.headers.id,
                },
            });
            if (resource === null) {
                res.status(404).json({
                    status: "Error",
                    message: "Unable to locate resource to delete",
                });
                return;
            }

            await prisma.resource.delete({
                where: {
                    id: resource.id,
                },
            });
            await removeResource(resource.filename);
            res.status(200).json({
                status: "Success",
                message: "Resource successfully deleted",
            });
        } catch (error) {
            res.status(500).json({
                status: "Error",
                message: "An error occurred while removing the resource",
            });
        }
    } else {
        res.status(405).json({ status: "Error", message: "Method not allowed" });
    }
}
