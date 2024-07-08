import { getPostIds, getPost } from "src/404wolf/posts";
import { Vault } from "obsidian";
import { notify, toTitleCase } from "src/utils/misc";
import PostFetcher from "./postFetcher";

export default async function fetchPosts(
  vault: Vault,
  reservedRoot: string,
  domain: string
) {
  const postIds = await getPostIds(domain);
  console.log(`Fetching posts ${postIds}`);

  postIds.forEach(postId => {
    console.log(`Processing post id:${postId}`);

    // Fetch the post and its resources
    getPost(domain, postId).then(postData => {
      notify(`Fetching ${postId}`);
      const root = [reservedRoot, `${toTitleCase(postData.type)}s`];
      const postFetcher = new PostFetcher(vault, root, postData, domain);
      postFetcher.fetchPost().then(() => notify(`Fetched ${postId}`));
    });
  });
}
