import {NextApiRequest, NextApiResponse} from 'next';
import AboutData from '@/components/about/AboutData';
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

interface Response extends NextApiResponse {
    json: (data: AboutData) => void;
}

export default async function handler(req: NextApiRequest, res: Response) {
    const contacts = await prisma.contact.findMany()
    return res.status(200).json(contacts);
}