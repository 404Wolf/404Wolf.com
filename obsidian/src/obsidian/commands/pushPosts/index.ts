import MyPlugin from "src/main";
import getActivePost, { ActivePostState } from "src/utils/404wolf";
import { notify } from "src/utils/misc";
import PostPusher from "./PostPusher";

/**
 * Pushes the current viewport post to the server.
 */
export async function pushPost(plugin: MyPlugin) {
	const [currentPost, postFetchStatus] = await getActivePost(plugin);
	if (postFetchStatus !== ActivePostState.VALID_POST) {
		notify("Failed to fetch post.");
		return;
	}

	notify(`Pushing post "${currentPost.id}"`);
	const postPusher = new PostPusher(plugin, currentPost);
	await postPusher.pushPost({});
	notify(`Post "${currentPost.id}" pushed.`);
}
