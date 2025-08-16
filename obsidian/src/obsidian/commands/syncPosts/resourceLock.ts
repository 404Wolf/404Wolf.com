import { PostResource } from "src/404wolf/PostResource";
import * as crypto from "crypto";
import * as path from "path";
import MyPlugin from "src/main";

function sha256Hash(content: string | Buffer): string {
	return crypto.createHash("sha256").update(content).digest("hex");
}

export interface PostResourceLock {
	data: string;
	metadata: {
		id: string;
		title: string;
		filename: string;
		url: string;
		type: string;
		postId: string;
		description: string | null;
	};
	lockedAt: number;
}

export default async (
	plugin: MyPlugin,
	path: string[],
	resource: PostResource,
): Promise<PostResourceLock> => {
	const file = plugin.app.vault.getFileByPath(path.join(...path));
	if (file) {
		const resourceData = await plugin.app.vault.readBinary(file);
		return {
			data: sha256Hash(Buffer.from(resourceData)),
			metadata: {
				id: sha256Hash(resource.id),
				title: sha256Hash(resource.title),
				filename: sha256Hash(resource.filename),
				url: sha256Hash(resource.url),
				type: sha256Hash(resource.type),
				postId: sha256Hash(resource.postId),
				description: resource.description
					? sha256Hash(resource.description)
					: null,
			},
			lockedAt: Date.now(),
		};
	}
	throw new Error("File doesn't exist!");
};
