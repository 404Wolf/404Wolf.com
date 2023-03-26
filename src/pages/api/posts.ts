import { list_projects as list_projects } from "./projects/listed"
import { NextApiRequest, NextApiResponse } from 'next';
import PostData from "@/components/posts/PostData";

interface Request extends NextApiRequest {
    query: {
        featuredOnly: "true" | "false"
    }
}

interface Response extends NextApiResponse {
    posts: PostData[]
}

export default function handler(req: Request, res: Response) {
    const posts = list_posts()
    const featuredOnly = req.query.featuredOnly === "true"

    if (posts) {
        if (featuredOnly) {
            const featuredPosts = posts.filter(
                (post) => post.featured
            )
            res.status(200).json({ posts: featuredPosts })
            return
        }
        else {
            res.status(200).json({ posts: posts })
            return
        }
    }
    else {
        res.status(204)
        return
    }
}

export function list_posts(): PostData[] | null {
    const posts: PostData[] = []

    const projects = list_projects()?.forEach(
        (project) => posts.push(project)
    )

    if (posts.length === 0) return null
    return posts
}