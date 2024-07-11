import { PostResourceLock } from "./resourceLock";

import { join } from "path";
import Post from "src/404wolf/Post";
import { PostResource } from "src/404wolf/PostResource";
import MyPlugin from "src/main";
import { notify } from "src/utils/misc";
import { createFile } from "src/utils/vault";
import lockResource from "./resourceLock";

export default class PostSyncer {
  path: string[];

  constructor(path: string[], public plugin: MyPlugin, public post: Post) {
    this.path = [...path, post.id];
  }

  /**
   * Fetch the post and all its resources.
   * @param1 {Object} param1
   * @param {string} param1.notes Whether to fetch the post notes.
   * @param {PostResource[]} param1.resources Whether to fetch the post resources.
   * @param {boolean} param1.doNotify Whether to notify the user after fetching.
   */
  fetchPost = async ({
    contents = true,
    notes = true,
    resources = true,
    doNotify = true
  }: {
    contents?: boolean;
    notes?: boolean;
    resources?: boolean;
    doNotify?: boolean;
  }): Promise<void> => {
    await Promise.all([
      contents && this.fetchContent(),
      notes && this.fetchNotes(),
      resources && this.fetchResources()
    ]).then(() => {
      if (doNotify) notify(`Successfully fetched "${this.post.id}".`);
    });
  };

  /**
   * Fetch the content of the post and put it in a file.
   */
  fetchContent = async () => {
    await createFile(
      this.post.plugin.app.vault,
      join(...this.path, "Post.md"),
      await this.post.markdown.packMetadata()
    );
  };

  /**
   * Fetch notes about the post and put it in a file.
   */
  fetchNotes = async () => {
    await createFile(
      this.post.plugin.app.vault,
      join(...this.path, "Notes.md"),
      this.post.notes
    );
  };

  /**
   * Fetch a single post resource.
   * @param resource The resource to fetch.
   */
  fetchResource = async (resource: PostResource) => {
    const filePathArr = [...this.path, "Resources", resource.filename];
    const foundResource = this.plugin.app.vault.getFileByPath(
      join(...this.path, "Resources", resource.filename)
    );
    if (foundResource !== null) {
      return;
    }
    const filepath = join(...filePathArr);
    const resourceData = await resource.getData();
    await createFile(this.post.plugin.app.vault, filepath, resourceData);
  };

  /**
   * Fetch all resources of the post and put them in a file in the resource
   * subdirectory for the post being fetched.
   */
  fetchResources = async () => {
    return await Promise.all(
      this.post.resources.map(
        async (resource: PostResource) => await this.fetchResource(resource)
      )
    );
  };

  /**
   * Lock a single post resource
   * @param resource The resource to lock.
   * @returns {PostResourceLock} The resource lock.
   */
  lockResource = async (resource: PostResource): Promise<PostResourceLock> => {
    const filePathArr = [...this.path, "Resources", resource.filename];
    return await lockResource(this.plugin, filePathArr, resource);
  };

  /**
   * Lock all resources of the post.
   * @returns {PostResourceLock[]} The resource locks.
   */
  lockResources = async (): Promise<PostResourceLock[]> => {
    return await Promise.all(
      this.post.resources.map(
        async (resource: PostResource) => await this.lockResource(resource)
      )
    );
  };
}
