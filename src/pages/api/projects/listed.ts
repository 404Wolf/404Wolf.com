import path from 'path';
import fs from 'fs';
import { project_by_id as projectFromId } from './by_id';
import { NextApiRequest, NextApiResponse } from 'next';
import PostData from '@/components/posts/PostData';

interface Request extends NextApiRequest {
    query: {
        tag: string | undefined
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const projects = list_projects()?.filter(
        (project) => project.tags.includes(req.query.tag as string)
    ) as PostData[]

    res.status(200).json({ projects: projects })
}

export function list_projects (): PostData[] | null {
    // The path where all projects are stored
    const projectsPath = path.join(process.cwd(), "public", 'projects')

    // Fetch all the project ids from the projects folder
    // and filter out the ones that are None
    const projects = fs.readdirSync(projectsPath).map(
        (project) => projectFromId(project)
    ).filter(project=>(project !== null)) as PostData[]
    
    // If there are no projects, return null
    if (projects.length === 0) return null

    // Otherwise, return the projects
    return projects
}
