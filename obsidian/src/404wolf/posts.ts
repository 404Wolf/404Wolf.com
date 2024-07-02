/**
 * Returns a list of IDs of all the posts.
 */
export async function getPosts(): Promise<string[]> {
  return [""];
}

export async function getPost(): Promise<string> {
  const post = await (
    fetch("http://localhost:3000/api/posts/linuxClassPortfolio")
    .then(response => response.json())
    .then(data => data.data.markdown.data)
  ) as string;
  return post;
}

