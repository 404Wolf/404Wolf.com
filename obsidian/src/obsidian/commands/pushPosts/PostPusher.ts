import Post from "src/404wolf/Post";
import { PostResource } from "src/404wolf/PostResource";
import MyPlugin from "src/main";
import { notify, toTitleCase } from "src/utils/misc";
import * as path from "path";
import { TFile } from "obsidian";

export default class PostPusher {
  constructor(public plugin: MyPlugin, public post: Post) {}

  /**
   * Push the post and all its resources.
   * @param contents Whether to push the post content.
   */
  pushPost = async ({
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
      contents && this.postMarkdown(),
      notes && this.pushNotes(),
      resources && this.pushResources()
    ]).then(() => {
      doNotify && notify(`Successfully pushed "${this.post.id}".`);
    });
  };

  #getRoot = () => {
    return [this.plugin.settings.path, `${toTitleCase(this.post.type)}s`];
  } 

  /**
   * Push the content of the post to the server.
   */
  postMarkdown = async () => {
    const filepath = path.join(...this.#getRoot(), this.post.id, "Post.md");
    const postFile = this.plugin.app.vault.getFileByPath(filepath)!;
    const postFileContents = await this.plugin.app.vault.read(postFile);
    await this.post.markdown.unpackMetadataMarkdown(postFileContents, true);
    await this.post.save();
  };

  /**
   * Push notes about the post to the server.
   */
  pushNotes = async () => {
    const filepath = path.join(...this.#getRoot(), this.post.id, "Notes.md");
    const notesFile = this.plugin.app.vault.getFileByPath(filepath);
    if (!notesFile) {
      notify("Notes file doesn't exist!");
      throw new Error("Notes file doesn't exit.")
    }
    const notesFileContents = await this.plugin.app.vault.read(notesFile);
    this.post.notes = notesFileContents;
    await this.post.save();
  }

  /**
   * Push a post resource to the server.
   * @param resourceFilename The resource to push. File name as it is in Obsidian vault.
   */
  pushResource = async (resourceFilename: string) => {
    const filepath = path.join(...this.#getRoot(), this.post.id, "Resources", resourceFilename);
    const resourceFile = this.plugin.app.vault.getFileByPath(filepath);
    if (!resourceFile) {
      notify(`Resource file "${resourceFilename}" doesn't exist!`);
      throw new Error(`Resource file "${resourceFilename}" doesn't exist!`);
    }
    const resourceFileContents = await this.plugin.app.vault.readBinary(resourceFile);
    PostResource.create(
      this.plugin,
      resourceFileContents,
      this.post,
      resourceFilename,
      resourceFilename,
      resourceFilename,
      "image",
      "Added with Obsidian.",
    )
  }

  /**
   * Push all post resources to the server.
   * Automatically looks in the resource directory for the post and finds all new resources.
   */
  pushResources = async () => {
    const resourceDir = path.join(...this.#getRoot(), this.post.id, "Resources");
    const resourceDirFiles = this.plugin.app.vault.getFolderByPath(resourceDir);
    if (!resourceDirFiles) {
      notify("Resource directory doesn't exist!");
      throw new Error("Resource directory doesn't exist!");
    }

    // Make sure to only upload new posts
    const thisPostResourceFileIds = new Set(this.post.resources.map(resource => resource.filename))
    const resourceFiles = resourceDirFiles.children
      .map((resource: TFile) => resource.name)
      .filter((resource: string) => !thisPostResourceFileIds.has(resource))

    return await Promise.all(
      resourceFiles.map(resourceFile => this.pushResource(resourceFile))
    );
  }
}
