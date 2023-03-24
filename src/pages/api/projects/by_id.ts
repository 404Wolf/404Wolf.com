import fs from 'fs';
import path from 'path';
import ProjectData from "@/interfaces/project_data";
import ProjectsData from "@/interfaces/projects_data";
import { NextApiRequest, NextApiResponse } from 'next';

interface Request extends NextApiRequest {
    headers: {
        id: string;
    }
}

export default function handler(req: Request, res: NextApiResponse) {
    const projectData: null | ProjectData = worker(req.headers.id)
    
    if (projectData !== null) {
        // Return the project's data
        res.status(200).json({ data: worker(req.headers.id) })
    }
    else {
        // Return an error
        res.status(404).json({ error: "Project not found" })
    }
}

export function worker (id: string): null | ProjectData {
    if (id !== undefined) {
        const projectPath: string = path.join(process.cwd(), "public", 'projects', `${id}`)
        
        const projectData: ProjectData = JSON.parse(fs.readFileSync(path.join(projectPath, "project.json"), 'utf-8'))
        const resource = projectData.cover[Math.floor(Math.random() * projectData.cover.length)]
        projectData.cover = `/projects/${id}/resources/${resource}`

        return projectData
    }
    else {
        return null
    }
}
