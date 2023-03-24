import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import AboutData from '@/interfaces/about_data';

interface Response extends NextApiResponse {
    json: (data: AboutData) => void;
}

export default function handler (req: NextApiRequest, res: Response) {
    return res.status(200).json(worker());
}
    
export function worker (): AboutData {
    const aboutPath = path.join(process.cwd(), 'about.json');
    const aboutData = fs.readFileSync(aboutPath, 'utf8');
    const about = JSON.parse(aboutData);
    return about;
}
