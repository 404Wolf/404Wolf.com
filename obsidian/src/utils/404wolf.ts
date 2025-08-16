import MyPlugin from "src/main";
import { notify } from "src/utils/misc";
import Post from "src/404wolf/Post";

export enum ActivePostState {
  VALID_POST,
  INEXISTENT_POST,
  WRONG_POST_FILE,
  NO_POST,
}

/**
 * Get the active post being viewed in the workspace.
 */
export default async function getActivePost(
  plugin: MyPlugin,
  doNotify: boolean = true,
): Promise<
  | [Post, ActivePostState.VALID_POST]
  | [null, ActivePostState.INEXISTENT_POST]
  | [null, ActivePostState.WRONG_POST_FILE]
  | [null, ActivePostState.NO_POST]
> {
  const activeFile = plugin.app.workspace.getActiveFile();
  if (!activeFile) {
    doNotify &&
      notify(
        "No active file. You must have a file within a post directory open in the editor viewport.",
      );
    return [null, ActivePostState.NO_POST];
  }
  if (
    activeFile.parent !== null &&
    !(await Post.getAllPostIds(plugin)).includes(activeFile.name) &&
    !activeFile.path.startsWith(plugin.settings.path)
  ) {
    doNotify &&
      notify(
        "The active file must be named '{post-title}.md' and be within the root 404Wolf directory.",
      );
    return [null, ActivePostState.WRONG_POST_FILE];
  }

  const currentProjectFullPath = (activeFile.path as string).split("/");
  const currentPostId =
    currentProjectFullPath[currentProjectFullPath.length - 2];
  const postIds = await Post.getAllPostIds(plugin);

  console.log(postIds);
  console.log(currentPostId);

  // The post fetch was a success; fetch it and return
  return [
    await Post.fromId(plugin, currentPostId, currentProjectFullPath[-1]),
    ActivePostState.VALID_POST,
  ];
}
