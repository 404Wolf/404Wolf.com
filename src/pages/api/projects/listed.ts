import path from 'path';
import fs from 'fs';
import { projectById } from './byId';
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
    const projects = fs.readdirSync(projectsPath)
        .filter(
            // Remove the list of all the projects from the list of projects
            (projectId) => projectId !== "projects.json"
        )
        .map(
            // Convert the list from that of project ids to project objects
            (project) => projectById(project)
        )
        .filter(
            // Remove any projects that we were unable to fetch data for
            project=>(project !== null)
        ) as PostData[]
    
    // If there are no projects, return null
    if (projects.length === 0) return null

    // Convert the projects array into a dictionary where the key is the project id
    const projectsById: {[key: string]: PostData} = {}
    projects.forEach((project) => {
        projectsById[project.id] = project
    })

    // Create a list that we will place the finalized projects in.
    const sortedProjects: PostData[] = []

    // Projects.json is a list of all of the projects, in order.
    // If a project is not in the list, add it to the end of the projects 
    // array that we will return.
    const orderedProjectIds: string[] = JSON.parse(
        fs.readFileSync(path.join(process.cwd(), "public", "projects", "projects.json"), "utf8")
    )
    for ( const projectId of orderedProjectIds ) {
        sortedProjects.push(projectsById[projectId])
    }

    // Add any projects that are not in the projects.json file to the end of the list
    for ( const project of projects ) {
        if (!orderedProjectIds.includes(project.id)) {
            sortedProjects.push(project)
        }
    }

    // Return the sorted projects
    return sortedProjects
}
