import type MyPlugin from "src/main";
import Post from "src/404wolf/Post";
import { notify, toTitleCase } from "src/utils/misc";
import PostFetcher from "./PostFetcher";

/**
 * Fetches all the posts from the given domain and stores them in the vault.
 */
export default async function fetchPosts(plugin: MyPlugin) {
  const postIds = await Post.getAllPostIds(plugin);

  console.log(`Fetching posts ${postIds}`);
  notify(`Fetching ${postIds.length} posts...`);

  await Promise.all(postIds.map((postId: string) => {
    Post.fromId(plugin, postId).then((post: Post) => {
      const root = [plugin.settings.path, `${toTitleCase(post.type)}s`];
      const postFetcher = new PostFetcher(root, post);
      postFetcher.fetchPost().then(() => notify(`Fetched ${postId}`));
    });
  }))
};
