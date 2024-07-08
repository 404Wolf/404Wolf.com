import { Vault } from "obsidian";
import { makeCodeBlock, notify } from "src/utils/misc";
import { createFile } from "src/utils/vault";
import { join } from "path";
import { fetchResource } from "src/404wolf/resources";
import { Post } from "src/404wolf/types";
import {
  createMarkdownWithFrontmatter,
  prependHeading,
  updateImageLinks
} from "src/utils/markdown";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";

export default class PostFetcher {
  vault: Vault;
  path: string[];
  post: Post;
  domain: string;

  constructor(vault: Vault, path: string[], post: Post, domain: string) {
    this.vault = vault;
    this.path = [...path, post.id];
    this.post = post;
    this.domain = domain;
  }

  /**
   * Fetch the post and all its resources.
   */
  fetchPost = async () => {
    await Promise.all([
      this.fetchContent(),
      this.fetchNotes(),
      this.fetchResources()
    ]);
  };

  /**
   * Fetch the content of the post and put it in a file.
   */
  fetchContent = async () => {
    let transformedMarkdown: string = this.post.markdown.data;

    const imageIdsToFilenames = Object.fromEntries(
      this.post.resources.map(resource => [resource.id, resource.filename])
    );

    const frontmatter = {
      id: this.post.id,
      title: this.post.title,
      type: this.post.type,
      date: this.post.date,
      tags: this.post.tags,
      cssclasses: ["404WolfMarkdown"]
    };

    const result = await unified()
      .use(remarkParse)
      .use(updateImageLinks(imageIdsToFilenames))
      .use(prependHeading(1, "Description", this.post.description, true))
      .use(remarkStringify)
      .process(transformedMarkdown);
    transformedMarkdown = result.toString();

    transformedMarkdown = createMarkdownWithFrontmatter(
      frontmatter,
      transformedMarkdown
    );

    await createFile(
      this.vault,
      join(...this.path, "Post.md"),
      transformedMarkdown,
      true
    );
  };

  /**
   * Fetch notes about the post and put it in a file.
   */
  fetchNotes = async () => {
    await createFile(
      this.vault,
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
      this.post.resources
        .filter(resource => !resource.filename.endsWith("md"))
        .map(resource => {
          fetchResource(this.domain, resource.id).then(resourceData => {
            createFile(
              this.vault,
              join(...this.path, "Resources", resource.filename),
              resourceData,
              true
            ).then(() => notify(`Fetched resource ${resource.filename}`));
          });
        })
    );
  };
}
