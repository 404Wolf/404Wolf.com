import type MyPlugin from "src/main";
import getActivePost, { ActivePostState } from "src/utils/404wolf";
import { notify } from "src/utils/misc";

function copyToClipboard(text: string): Promise<void> {
	return navigator.clipboard.writeText(text);
}

function openUrlInDefaultBrowser(url: string): void {
	copyToClipboard(url);
	const { exec } = require("child_process");
	let command: string;

	switch (process.platform) {
		case "darwin": // macOS
			command = `open "${url}"`;
			break;
		case "win32": // Windows
			command = `start "${url}"`;
			break;
		default: // Linux and others
			command = `xdg-open "${url}"`;
			break;
	}

	exec(command, (error: Error | null) => {
		if (error) {
			console.error(`Failed to open URL: ${error}`);
			return;
		}
		console.log(`Opened ${url} in default browser`);
	});
}

export default async function gotoCurrentPost(plugin: MyPlugin) {
	const [currentPost, postFetchStatus] = await getActivePost(plugin);
	if (postFetchStatus !== ActivePostState.VALID_POST) {
		notify("Not currently in a post");
		return;
	}
	const postUrl = `${plugin.settings.domain}/posts/${currentPost.type}/${currentPost.id}`;
	console.log("Found post:", postUrl);
	openUrlInDefaultBrowser(postUrl);
}
