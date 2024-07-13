import MyPlugin from "src/main";
import * as path from "path";
import getActivePost, { ActivePostState } from "src/utils/404wolf";
import { notify, toTitleCase } from "src/utils/misc";

export async function deletePost(plugin: MyPlugin) {
  const [currentPost, postFetchStatus] = await getActivePost(plugin);

  if (postFetchStatus === ActivePostState.VALID_POST) {
    notify(`Deleting ${currentPost.id}...`);
    const currentPostDirectoryArr = [
      plugin.settings.path,
      "Posts",
      toTitleCase(currentPost.type) + "s",
      currentPost.id
    ];
    console.log(currentPostDirectoryArr);
    const currentPostDirectory = plugin.app.vault.getFolderByPath(
      path.join(...currentPostDirectoryArr)
    );
    if (!currentPostDirectory) {
      notify(
        "Failed to delete post. Post directory not found. Please check the path in settings."
      );
      return;
    }
    await plugin.app.vault.delete(currentPostDirectory, true);
    await currentPost.delete();
  }
}
