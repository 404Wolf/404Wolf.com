import type MyPlugin from "src/main";
import getActivePost, { ActivePostState } from "src/utils/404wolf";
import { notify } from "src/utils/misc";
import open from "open"

export default async function gotoCurrentPost(plugin: MyPlugin) {
  const [currentPost, postFetchStatus] = await getActivePost(plugin);
  if (postFetchStatus !== ActivePostState.VALID_POST) {
    notify("Not currently in a post");
    return;
  }
  // window.open("https://example.com")
  const postUrl = `${plugin.settings.domain}/posts/${currentPost.type}/${currentPost.id}`
  console.log("Found post:", postUrl)
  open(postUrl.toString())
}
