import fs from "fs";
import path from "path";
import { NextApiRequest, NextApiResponse } from "next";
import { listTypes } from "./listed";

interface Request extends NextApiRequest {
    query: {
        id: string;
    };
}

export default function handler(req: Request, res: NextApiResponse) {
    res.status(200).json({ data: postMd(req.query.id) });
}

export function postMd(postId: string): string | null {
    for (const type of listTypes()) {
        const postPath = path.join(
            process.cwd(),
            "public",
            "posts",
            type,
            `${postId}`,
            "post.md"
        );
        if (fs.existsSync(postPath)) {
            return fs.readFileSync(postPath, "utf8");
        }
    }
    return null;
}
