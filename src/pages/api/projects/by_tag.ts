import { NextApiRequest, NextApiResponse } from 'next'
import ProjectData from '../../../interfaces/projects';
import { worker as list_projects } from './listed';

interface Request extends NextApiRequest {
    headers: {
        tag: string
    }
} 

export default async function handler(req: Request, res: NextApiResponse) {
    const projects = list_projects()

    // Now that we have a list of all the projects' data, we can filter them by tag
    const located: { [key: string]: ProjectData } = {}  // All projects that have the tag
    Object.entries(projects).forEach(([ id, data ]: [string, ProjectData]) => {
        if (data.tags.includes(req.headers.tag)) {
            located[id] = data;
        }
    });

    res.status(200).json({ located: located })
}
