import fs from 'fs';
import path from 'path';
import PostData from "@/components/posts/PostData";
import { NextApiRequest, NextApiResponse } from 'next';

interface Request extends NextApiRequest {
    query: {
        id: string
    }
}

export default function handler(req: Request, res: NextApiResponse) {
    const projectData: null | PostData = projectById(req.query.id)
    
    if (projectData !== null) {
        // Return the project's data
        res.status(200).json({ data: projectById(req.query.id) })
    }
    else {
        // Return an error
        res.status(404).json({ error: "Project not found" })
    }
}

export function projectById (id: string): null | PostData {
    if (id !== undefined) {
        const projectPath: string = path.join(process.cwd(), "public", 'projects', `${id}`)
        
        const projectData: PostData = JSON.parse(fs.readFileSync(path.join(projectPath, "project.json"), 'utf-8'))
        const resource = projectData.cover[Math.floor(Math.random() * projectData.cover.length)]
        projectData.cover = `/projects/${id}/resources/${resource}`
        projectData.type = "project"

        return projectData
    }
    else {
        return null
    }
}
