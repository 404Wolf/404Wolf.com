import PostData from "@/components/posts/PostData";
import { NextApiRequest, NextApiResponse } from "next";
import { listTypePosts, listTypes } from "./listed";
import path from "path";
import fs from "fs";
import { randomListItem } from "@/utils/misc";

interface Request extends NextApiRequest {
    query: {
        id: string;
        type: string;
    };
}

export default function handler(req: Request, res: NextApiResponse) {
    const projectData: null | PostData = postById(req.query.id, req.query.type);

    if (projectData !== null) {
        // Return the project's data
        res.status(200).json({ data: postById(req.query.id, req.query.type) });
    } else {
        // Return an error
        res.status(404).json({ error: "Project not found" });
    }
}

export function postById(postId: string, type: string): null | PostData {
    if (postId) {
        // Construct the path to the post's data
        const postPath = path.join(
            process.cwd(),
            "public",
            "posts",
            type,
            postId,
            "post.json"
        );

        const post = JSON.parse(fs.readFileSync(postPath, "utf8"));

        // Add the type and proper path to the cover image to the post
        post.type = type;
        post.cover = `/posts/${type}/${postId}/resources/${randomListItem(
            post.cover
        )}`;

        // Return the post
        return post;
    }
    return null;
}
