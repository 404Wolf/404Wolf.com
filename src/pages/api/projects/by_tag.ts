import { NextApiRequest, NextApiResponse } from 'next'
import ProjectData from '../../../interfaces/project_data';
import { worker as list_projects } from './listed';

interface Request extends NextApiRequest {
    query: {
        tag: string
    }
} 

export default async function handler(req: Request, res: NextApiResponse) {
    const projects = list_projects()

    if (projects !== null) {
        // Now that we have a list of all the projects' data, we can filter them by tag
        const located: { [key: string]: ProjectData } = {}  // All projects that have the tag
        Object.entries(projects).forEach(([ id, data ]: [string, ProjectData]) => {
            if (data.tags.includes(req.query.tag)) {
                located[id] = data;
            }
        });
        res.status(200).json({ located: located })
    }
    else {
        res.status(204)
    }
}
