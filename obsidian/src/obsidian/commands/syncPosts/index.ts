import Post from "src/404wolf/Post";
import { notify, toTitleCase } from "src/utils/misc";
import getActivePost, { ActivePostState } from "src/utils/404wolf";
import PostSyncer from "./PostSyncer";
import MyPlugin from "src/main";

/**
 * Fetches all the posts and stores them in the vault.
 */
export async function syncPosts(plugin: MyPlugin) {
  const postIds = await Post.getAllPostIds(plugin);

  console.log(`Fetching posts ${postIds}`);
  notify(`Fetching ${postIds.length} posts...`);

  let postIdsToFetch: string[];
  if (plugin.settings.devMode) postIdsToFetch = postIds.splice(0, 1);
  else postIdsToFetch = postIds;

  await Promise.all(
    postIdsToFetch.map((postId: string) => {
      Post.fromId(plugin, postId).then((post: Post) => {
        const root = [
          plugin.settings.path,
          "Posts",
          `${toTitleCase(post.type)}s`,
        ];
        const postSyncer = new PostSyncer(root, plugin, post);
        postSyncer.fetchPost({}).then(() => notify(`Fetched ${postId}`));
      });
    }),
  );
}

/**
 * Fetches a specific post and stores it in the vault.
 */
export async function syncPost(plugin: MyPlugin) {
  const [currentPost, postFetchStatus] = await getActivePost(plugin);
  if (postFetchStatus !== ActivePostState.VALID_POST) {
    notify("Failed to fetch post.");
    return;
  }

  notify(`Fetching post "${currentPost.id}"`);
  const root = [
    plugin.settings.path,
    "Posts",
    `${toTitleCase(currentPost.type)}s`,
  ];
  const postSyncer = new PostSyncer(root, plugin, currentPost);
  await postSyncer.fetchPost({});
  notify(`Fetched post "${currentPost.id}"`);
}
