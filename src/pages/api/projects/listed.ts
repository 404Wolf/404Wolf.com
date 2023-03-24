import path from 'path';
import fs from 'fs';
import { worker as projectFromId } from './by_id';
import { NextApiRequest, NextApiResponse } from 'next';
import ProjectData from '../../../interfaces/projects';
import ProjectsData from '../../../interfaces/projects_data';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    res.status(200).json({ projects: worker() })
}

export function worker () {
    // The path where all projects are stored
    const projectsPath = path.join(process.cwd(), "public", 'projects')

    // Fetch all the project ids from the 
    let projects = fs.readdirSync(projectsPath)

    // Create a map of the projects to their data
    const by_id: ProjectsData = {}

    // Map the project ids to their data
    projects.forEach(
        (id) => {by_id[id] = projectFromId(id)}
    )

    // Return the list of projects and the data for each project
    return by_id
}
