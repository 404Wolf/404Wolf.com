import path from 'path';
import fs from 'fs';

export default function handler(req, res) {
    const projectsPath = path.join(process.cwd(), "public", 'projects')
    const projects = fs.readdirSync(projectsPath).filter(project => project !== "projects.json")
    res.status(200).json({ projects: projects })
}