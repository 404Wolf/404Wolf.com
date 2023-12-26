import fs from 'fs';
import {NextApiRequest, NextApiResponse} from 'next';
import path from 'path';
import AboutData from '@/components/about/AboutData';

interface Response extends NextApiResponse {
    json: (data: AboutData) => void;
}

export default function handler(req: NextApiRequest, res: Response) {
    const aboutPath = path.join(process.cwd(), 'public', 'about.json');
    const aboutData = fs.readFileSync(aboutPath, 'utf8');
    const about = JSON.parse(aboutData);
    return res.status(200).json(about);
}
