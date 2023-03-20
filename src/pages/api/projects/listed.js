import path from 'path';
import fs from 'fs';
import { worker as projectFromId } from './by_id';

export default async function handler(req, res) {
    res.status(200).json({ projects: worker() })
}

export function worker () {
    // The path where all projects are stored
    const projectsPath = path.join(process.cwd(), "public", 'projects')

    // Fetch all the project ids from the 
    let projects = fs.readdirSync(projectsPath)

    const by_id = {}
    // Fetch data for each project, and then store the Promise that is fetching the data
    // into the projects array, and the actual data into the by_id object
    projects = projects.forEach(
        (id) => {by_id[id] = projectFromId(id)}
    )

    // Return the list of projects and the data for each project
    return by_id
}