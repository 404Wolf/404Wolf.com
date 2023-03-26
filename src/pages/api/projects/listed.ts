import path from 'path';
import fs from 'fs';
import { worker as projectFromId } from './by_id';
import { NextApiRequest, NextApiResponse } from 'next';
import ProjectData from '@/interfaces/project_data';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    res.status(200).json({ projects: worker() })
}

export function worker (): ProjectData[] | null {
    // The path where all projects are stored
    const projectsPath = path.join(process.cwd(), "public", 'projects')

    // Fetch all the project ids from the projects folder
    // and filter out the ones that are None
    const projects = fs.readdirSync(projectsPath).map(
        (project) => projectFromId(project)
    ).filter(project=>(project !== null)) as ProjectData[]
    
    // If there are no projects, return null
    if (projects.length === 0) return null

    // Otherwise, return the projects
    return projects
}
