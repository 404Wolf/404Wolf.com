import fs from "fs";
import path from "path";
import { NextApiRequest, NextApiResponse } from "next";

interface Request extends NextApiRequest {
    query: {
        id: string;
        type: string;
    };
}

export default function handler(req: Request, res: NextApiResponse) {
    res.status(200).send(postMd(req.query.id, req.query.type))
}

export function postMd(id: string, type: string): string | null {
    const postPath = path.join(
        process.cwd(),
        "public",
        "posts",
        type,
        `${id}`,
        "post.md"
    );
    if (fs.existsSync(postPath)) {
        return fs.readFileSync(postPath, "utf8");
    }
    return null;
}
