import Post from "src/404wolf/Post";
import type MyPlugin from "src/main";
import { notify } from "src/utils/misc";

/**
 * Pushes the current viewport post to the server.
 */
export default async function pushPost(
  plugin: MyPlugin
) {
  const activeFile = plugin.app.workspace.getActiveFile();
  if (!activeFile) {
    notify("No active file. You must have a file within a post directory open in the editor viewport.");
    return;
  }
  if (activeFile.name !== "Post.md" || !activeFile.path.startsWith(plugin.settings.path)) {
    notify("The active file must be named 'Post.md' and be within the root 404Wolf directory.");
    return;
  }
  const currentProjectFullPath = (activeFile.path as string).split("/")
  const currentProjectProjectPath = currentProjectFullPath[currentProjectFullPath.length - 2]
  const postIds = await Post.getAllPostIds();
  if (!postIds.includes(currentProjectProjectPath)) {
    notify("This post has not been fetched yet. Please fetch all posts before pushing this post.");
    return;
  }
}
