import { uploadFileLink } from "@/utils/aws";
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";

interface Request extends NextApiRequest {
    body: {
        b64: string;
    };
}

export default async function handler(req: Request, res: NextApiResponse) {
    if (req.method === "POST") {
        // Create an aws link to allow the user to post a new resume.
        // The object name is env RESUME_OBJECT_NAME.
        if (process.env.RESUME_OBJECT_NAME) {
            res.status(200);
            res.json({link: await uploadFileLink(process.env.RESUME_OBJECT_NAME)});
        } else {
            res.status(500);
            res.json({ error: "Resume object name not set in env." });
        }
    }
}
