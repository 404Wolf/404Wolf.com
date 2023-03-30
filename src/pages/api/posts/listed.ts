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
        // Whether posts aer sorted by type or loose
        loose: string | undefined;
    };
}

export default async function handler(req: Request, res: NextApiResponse) {
    const types = req.query.types?.split(",") || listTypes();
    const tags = req.query.tags?.split(",");
    const loose = req.query.loose === "true";

    // Create a dictionary where the key is the type of post and the value is the list of posts of that type
    const byType: { [key: string]: PostData[] | null } = {};
    for (const type of types) {
        byType[type] = listTypePosts(type, tags);
    }

    // Convert all the types into one big list and return it if the posts are loose
    if (loose) {
        let loosePosts: PostData[] = [];
        for (const type of types) {
            if (byType[type] !== null) {
                loosePosts = loosePosts.concat(byType[type] as PostData[]);
            }
        }
        res.status(200).json({ data: loosePosts });
        return;
    }

    // Return the list of posts
    res.status(200).json({ byType });
}

export function listTypes() {
    return JSON.parse(
        fs.readFileSync(path.join("public", "posts", "types.json"), "utf8")
    );
}

export function listTypePosts(type: string, tags?: string[]): PostData[] | null {
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

    // If there are no posts, return null
    if (posts.length === 0) return null;

    // Convert the posts array into a dictionary where the key is the post id
    const postsById: { [key: string]: PostData } = {};
    posts.forEach((post) => {
        postsById[post.id] = post;
    });

    // Create a list that we will place the finalized posts in.
    let sortedPosts: PostData[] = [];

    // Posts.json is a list of all of the posts, in order.
    // If a post is not in the list, add it to the end of the posts
    // array that we will return.
    const orderedPostIds: string[] = JSON.parse(
        fs.readFileSync(
            path.join(process.cwd(), "public", "posts", type, "posts.json"),
            "utf8"
        )
    );
    for (const postId of orderedPostIds) {
        sortedPosts.push(postsById[postId]);
    }

    // Add any posts that are not in the posts.json file to the end of the list
    for (const post of posts) {
        if (!orderedPostIds.includes(post.id)) {
            sortedPosts.push(post);
        }
    }

    // Remove all posts that do not include very tag in tags, if tags isn't undefined
    if (tags) {
        sortedPosts = sortedPosts.filter((post) =>
            tags.every((tag) => post.tags.includes(tag))
        );
    }

    // Sort out all posts that have the hidden tag
    sortedPosts = sortedPosts.filter((post) => !post.tags.includes("hidden"));

    // Return the sorted posts
    return sortedPosts;
}

export function listAllPosts(tags?: string[]): PostData[] {
    // Create a list of all the posts
    let posts: PostData[] = [];
    const types = listTypes();

    // Add all of the posts from each type to the list
    for (const type of types) {
        const typePosts = listTypePosts(type, tags);
        if (typePosts) posts.push(...typePosts);
    }

    // Filter out any posts that do not include every tag in tags, if tags isn't undefined
    if (tags) {
        posts = posts.filter((post) => tags.every((tag) => post.tags.includes(tag)));
    }

    // Return the list of all posts
    return posts;
}
