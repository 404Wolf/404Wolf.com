import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    const projectData = worker(req.headers.id)
    
    if (projectData !== null) {
        // Return the project's data
        res.status(200).json({ data: worker(req.headers.id) })
    }
    else {
        // Return an error
        res.status(404).json({ error: "Project not found" })
    }
}

export function worker (id) {
    if (id !== undefined) {
        const projectPath = path.join(process.cwd(), "public", 'projects', `${id}`)
        const projectData = JSON.parse(fs.readFileSync(path.join(projectPath, "project.json"), 'utf-8'))
        projectData.cover = `/projects/${id}/${projectData.cover}`
        
        return projectData
    }
    else {
        return null
    }
}