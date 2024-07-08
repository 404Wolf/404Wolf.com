import { notify } from "src/utils/misc";
import type { Post } from "./types";

/**
 * Returns a list of IDs of all the posts.
 * @param {string} domain The domain the website is hosted on.
 */
export async function getPostIds(domain: string): Promise<string[]> {
  return await fetch(`${domain}/api/posts`)
    .then((response: any) => response.json())
    .catch(notify);
}

/**
 * Returns the post with the given ID.
 * @param {string} domain The domain the website is hosted on.
 * @param id The ID of the post to return.
 * @returns The post with the given ID.
 */
export async function getPost(domain: string, id: string): Promise<Post> {
  const post = await fetch(`${domain}/api/posts/${id}`)
    .then(response => response.json())
    .then(responseData => responseData.data)
    .catch(notify);
  return post as Post;
}
