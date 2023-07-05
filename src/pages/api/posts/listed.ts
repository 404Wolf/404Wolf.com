import path from "path";
import fs from "fs";
import { postById } from "./byId";
import { NextApiRequest, NextApiResponse } from "next";
import PostData from "@/components/posts/PostData";

interface Request extends NextApiRequest {
    query: {
        // The tags to filter by, or don't filter by tags. (separated by commas)
        tags: string | undefined;
        // The folder that the projects are stored in, or use all folders. (separated by commas)
        types: string | undefined;
    };
}

export default async function handler(req: Request, res: NextApiResponse) {
    const types = req.query.types?.split(",");
    const tags = req.query.tags?.split(",");

    const posts = [];
    if (types) {
        for (const type of types) {
            if (postsByType[type]) posts.push(...postsByType[type]);
        }
    }
    if (tags) {
        posts.push(...postsWithTags(allPosts, tags));
    }

    res.status(200).json(posts);
}

export function postsWithTags(posts: PostData[], tags: string[]): PostData[] {
    return posts.filter((post) => {
        for (const tag of tags) {
            if (!post.tags.includes(tag)) return false;
        }
        return true;
    });
}

function allPostTypes(): string[] {
    return JSON.parse(
        fs.readFileSync(path.join("public", "posts", "types.json"), "utf8")
    );
}

export function fetchPostsByType(): { [key: string]: PostData[] } {
    const postsByType: { [key: string]: PostData[] } = {};

    for (const type of allPostTypes()) {
        // The path where all posts are stored
        const postsPath = path.join(process.cwd(), "public", "posts", type);

        // Fetch all the post ids from the posts folder
        // and filter out the ones that are None
        const posts = fs
            .readdirSync(postsPath)
            .filter(
                // Remove the list of all the posts from the list of posts
                (postId) => postId !== "posts.json"
            )
            .map(
                // Convert the list from that of post ids to post objects
                (postId) => postById(postId, type)
            )
            .filter(
                // Remove any posts that we were unable to fetch data for
                (post) => post !== null
            ) as PostData[];

        // If there are posts, sort them and then add them to the dict under their proper type
        if (posts.length !== 0) {
            const sortedPosts: PostData[] = []

            // Posts.json is a list of all of the posts, in order.
            // If a post is not in the list, add it to the end of the posts
            // array that we will return.
            JSON.parse(
                fs.readFileSync(
                    path.join(process.cwd(), "public", "posts", type, "posts.json"),
                    "utf8"
                )
            ).forEach((postId: string) => {
                const post = postById(postId, type)
                if (post) sortedPosts.push(post)
            })
        
            postsByType[type] = sortedPosts;
        }
    }

    return postsByType;
}
export const postsByType: { [key: string]: PostData[] } = fetchPostsByType();

function fetchAllPosts(): PostData[] {
    const posts: PostData[] = [];
    allPostTypes().forEach((type) => {
        if (postsByType[type]) posts.push(...postsByType[type]);
    });
    return posts;
}
export const allPosts = fetchAllPosts();


