import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import type MyPlugin from "src/main";
import {
  createMarkdownWithFrontmatter,
  prependHeading,
  updateImageLinks
} from "src/utils/markdown";
import { notify } from "src/utils/misc";
import { unified } from "unified";

export class PostResource {
  constructor(
    public post: Post,
    public id: string,
    public title: string,
    public filename: string,
    public url: string,
    public type: string,
    public postId: string,
    public description: string | null
  ) { }

  /**
   * Fetch metadata about a resource from the resource ID.
   * @param {Post} post The post that the resource belongs to.
   * @param {string} id The ID of the resource to fetch.
   */
  static fromResourceId = async (post: Post, id: string) => {
    const resource = await fetch(`${post.plugin.settings.domain}/api/resources/${id}`)
      .then(response => response.json())
      .then(responseData => responseData.data)
      .catch(notify);
    return new PostResource(
      post,
      resource.id,
      resource.title,
      resource.filename,
      resource.url,
      resource.type,
      resource.postId,
      resource.description
    );
  };

  /**
   * Fetch the data of a resource.
   * @return {Promise<ArrayBuffer>}
   */
  getData = async (): Promise<ArrayBuffer> => {
    const link = await fetch(
      `${this.post.plugin.settings.domain}/api/resources/${this.id}/link`
    )
      .then((response: any) => response.json())
      .then(resource => resource.url)
      .catch(notify);
    if (!link) throw new Error("Failed to get resource URL");
    return (await fetch(link)).arrayBuffer();
  };
}

export class PostMarkdown {
  post: Post;
  id: string;
  data: string;

  constructor(post: Post, id: string, data: string) {
    this.post = post;
    this.id = id;
    this.data = data;
  }

  getMetadata = async () => {};

  /**
   * Pack post metadata into the markdown file itself.
   * @return {Promise<string>} The packaged markdown.
   */
  packMetadata = async (): Promise<string> => {
    const imageIdsToFilenames = Object.fromEntries(
      this.post.resources.map((resource: PostResource) => [
        resource.id,
        resource.filename
      ])
    );
    const frontmatter = {
      id: this.post.id,
      title: this.post.title,
      type: this.post.type,
      date: this.post.date,
      tags: this.post.tags,
      cssclasses: ["404WolfMarkdown"]
    };
    let result = await unified()
      .use(remarkParse)
      .use(updateImageLinks(imageIdsToFilenames))
      .use(prependHeading(1, "Description", this.post.description, true))
      .use(remarkStringify)
      .process(this.post.markdown.data)
      .then(result => result.toString());
    result = createMarkdownWithFrontmatter(frontmatter, result);
    return result;
  };
}

export default class Post {
  constructor(
    public plugin: MyPlugin,
    public id: string,
    public title: string,
    public description: string,
    public markdown: PostMarkdown,
    public covers: string[],
    public type: string,
    public date: string,
    public tags: string[],
    public createdAt: string,
    public editedAt: string,
    public notes: string,
    public resources: Array<PostResource>
  ) { }

  /**
   * Returns a list of all the post IDs.
   */
  static getAllPostIds = async (plugin: MyPlugin): Promise<string[]> => {
    const response = await fetch(
      `${plugin.settings.domain}/api/posts`
    ).then((response: any) => response.json());
    return response as string[];
  };

  /**
   * Make a new Post object from the ID of a post.
   * @param {MyPlugin} plugin The Obsidian plugin object.
   * @param {string} id The ID of the post to return.
   */
  static fromId = async (plugin: MyPlugin, id: string) => {
    const post = await fetch(`${plugin.settings.domain}/api/posts/${id}`)
      .then(response => response.json())
      .then(responseData => responseData.data)
      .catch(notify);

    const newPost =  new Post(
      plugin,
      post.id,
      post.title,
      post.description,
      new PostMarkdown((undefined as unknown as Post), post.markdown.id, post.markdown.data),
      post.covers,
      post.type,
      post.date,
      post.tags,
      post.createdAt,
      post.editedAt,
      post.notes,
      post.resources.map(
        (resource: any) =>
          new PostResource(
            (undefined as unknown as Post),
            resource.id,
            resource.title,
            resource.filename,
            resource.url,
            resource.type,
            resource.postId,
            resource.description
          )
      )
    );
    newPost.markdown.post = newPost;
    newPost.resources.forEach(resource => (resource.post = newPost));
    return newPost;
  };
}
