import path from 'path';
import fs from 'fs';

export default async function handler(req, res) {
    const url = `${req.headers['x-forwarded-proto'] || 'http'}://${req.headers.host}`

    // The path where all projects are stored
    const projectsPath = path.join(process.cwd(), "public", 'projects')

    // Fetch all the project ids from the 
    let projects = fs.readdirSync(projectsPath)

    const by_id = {}
    // Fetch data for each project, and then store the Promise that is fetching the data
    // into the projects array, and the actual data into the by_id object
    projects = await Promise.all(projects.map(projectId => {
        return fetch(`${url}/api/projects/by_id`, {headers: {id: projectId}})
            .then(res => res.json())
            .then(data => data.data)
            .then((data) => {by_id[projectId] = data; return data})
    }))
    // Change the relative cover path to be absolute
    projects = Object.entries(projects).forEach(
        ([id, data]) => {
            by_id[id].cover = `projects/${id}/${data.cover}`
        }
    )

    // Return the list of projects and the data for each project
    res.status(200).json({ projects: by_id })
}