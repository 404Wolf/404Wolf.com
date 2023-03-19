import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    if (req.headers.id !== undefined) {
        // Fetch the project's data file (the project.json file)
        const projectPath = path.join(process.cwd(), "public", 'projects', `${req.headers.id}`)

        // The project's .cover is, by default, just the name of the file of the cover image. 
        // We will convert that to be a url path to the image.
        const projectData = JSON.parse(fs.readFileSync(path.join(projectPath, "project.json"), 'utf-8'))
        projectData.cover = `/projects/${req.headers.id}/${projectData.cover}`

        // Return the project's data
        res.status(200).json({ data: projectData })
    }
    else {
        // If the id is not defined, return a 404 error
        res.status(404).json({ data: null })
    }
}