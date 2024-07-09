import { notify } from "src/utils/misc";
import { join } from "path";
import Post from "src/404wolf/Post";
import { createFile } from "src/utils/vault";

export default class PostFetcher {
  path: string[];

  constructor(path: string[], public post: Post) {
    this.path = [...path, post.id];
  }

  /**
   * Fetch the post and all its resources.
   */
  fetchPost = async () => {
    await Promise.all([
      this.fetchContent(),
      this.fetchNotes(),
      this.fetchResources()
    ]).then(() => notify("Successfully fetched all posts."));
  };

  /**
   * Fetch the content of the post and put it in a file.
   */
  fetchContent = async () => {
    await createFile(
      this.post.plugin.app.vault,
      join(...this.path, "Post.md"),
      await this.post.markdown.packMetadata(),
      true
    );
  };

  /**
   * Fetch notes about the post and put it in a file.
   */
  fetchNotes = async () => {
    await createFile(
      this.post.plugin.app.vault,
      join(...this.path, "Notes.md"),
      this.post.notes,
      true
    );
  };

  /**
   * Fetch all resources of the post and put them in a file in the resource
   * subdirectory for the post being fetched.
   */
  fetchResources = async () => {
    await Promise.all(
      this.post.resources.map(
        async (resource): Promise<void> => {
          const filepath = join(...this.path, "Resources", resource.filename);
          const resourceData = await resource.getData();
          return await createFile(
            this.post.plugin.app.vault,
            filepath,
            resourceData,
            true
          );
        }
      )
    );
  };
}
