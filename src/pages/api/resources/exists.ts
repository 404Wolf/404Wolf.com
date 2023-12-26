import type {NextApiRequest, NextApiResponse} from "next";
import {PrismaClient} from "prisma/prisma-client";

const prisma = new PrismaClient();

interface Request extends NextApiRequest {
    headers: {
        id: string;
    };
}

export default async function handler(req: Request, res: NextApiResponse) {
    if (req.method === "GET") {
        if ((await prisma.resource.findUnique({where: {id: req.headers.id}})) !== null)
            res.status(200).json({exists: "true"});
        else res.status(200).json({exists: "false"});
    }
}
