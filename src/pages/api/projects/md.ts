import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';

interface Request extends NextApiRequest {
    query: {
        id: string,
        width?: string,
    }
}

export default function handler(req: Request, res: NextApiResponse) {
    res.status(200).json({ data: worker(req.query.id) })
}

export function worker (projectId: string): string {
    const mdPath = path.join(process.cwd(), "public", 'projects', `${projectId}`, "project.md")
    const md = fs.readFileSync(mdPath, 'utf-8')
    return md
}
