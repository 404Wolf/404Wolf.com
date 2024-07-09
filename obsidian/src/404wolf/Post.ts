import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import MyPlugin from "src/main";
import {
  createMarkdownWithFrontmatter,
  parseMarkdownWithFrontmatter,
  prependHeading,
  updateImageLinks
} from "src/utils/markdown";
import { notify } from "src/utils/misc";
import { unified } from "unified";

export class PostResource {
  constructor(
    public plugin: MyPlugin,
    public id: string,
    public title: string,
    public filename: string,
    public url: string,
    public type: string,
    public postId: string,
    public description: string | null
  ) {}

  /**
   * Fetch metadata about a resource from the resource ID.
   * @param {Post} plugin The post that the resource belongs to.
   * @param {string} id The ID of the resource to fetch.
   */
  static fromResourceId = async (plugin: MyPlugin, id: string) => {
    const resource = await fetch(
      `${plugin.settings.domain}/api/resources/${id}`
    )
      .then(response => response.json())
      .then(responseData => responseData.data)
      .catch(notify);
    return new PostResource(
      plugin,
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
      `${this.plugin.settings.domain}/api/resources/${this.id}/link`
    )
      .then((response: any) => response.json())
      .then(resource => resource.url)
      .catch(notify);
    if (!link) throw new Error("Failed to get resource URL");
    return (await fetch(link)).arrayBuffer();
  };

  /**
   * Create a new resource given metadata and an a ArrayBuffer of the resource's data.
   * @param {ArrayBuffer} data The new data for the resource.
   * @param {Post} post The post the resource belongs to.
   * @param {string} id The id to give the resource.
   * @param {string} title The title to give the resource.
   * @param {string} filename The filename to give the resource.
   * @param {string} type The type to give the resource.
   * @param {string} description The description to give the resource.
   * @return {Promise<void>}
   */
  static create = async (
    plugin: MyPlugin,
    data: ArrayBuffer,
    post: Post,
    id: string,
    title: string,
    filename: string,
    type: string,
    description: string
  ): Promise<void> => {
    const uploadUrl: string = await fetch(`${plugin.settings.domain}/api/resources/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        secret: plugin.settings.secret
      },
      body: JSON.stringify({
        title,
        filename,
        type,
        description,
        postId: post.id
      })
    })
      .then(resp => resp.json())
      .then(data => data.uploadUrl)
      .catch(() => notify("Failed to create resource"));
    await fetch(uploadUrl, {
      method: "PUT",
      body: data
    }).catch(() => notify("Failed to upload resource"));
  };
}

interface PostMarkdownMetadata {
  id: string;
  title: string;
  type: string;
  date: string;
  tags: string[];
  postDescription: string;
  cssclasses: string[];
}

interface UnpackedPostMarkdown {
  postMarkdownMetadata: PostMarkdownMetadata;
  markdown: string;
}

export class PostMarkdown {
  constructor(
    public plugin: MyPlugin,
    public post: Post,
    public id: string,
    public data: string
  ) {}

  /**
   * Unpack the metadata from the markdown file itself to create a post.
   * @param {boolean} applyToPost Whether to apply the metadata to the post object.
   * @return {Promise<UnpackedPostMarkdown>}
   */
  unpackMetadataMarkdown = async (
    markdownWithMetadata: string,
    applyToPost: boolean = false
  ): Promise<UnpackedPostMarkdown> => {
    const { frontmatter: data, markdown } = parseMarkdownWithFrontmatter(
      markdownWithMetadata
    );
    const description = markdown.split("\n")[3];

    const imageFilenamesToIds = Object.fromEntries(
      this.post.resources.map((resource: PostResource) => [
        resource.filename,
        resource.id
      ])
    );
    const markdownWithoutDescription = markdown
      .split("\n")
      .slice(7)
      .join("\n");
    const markdownWithProperIds = await unified()
      .use(remarkParse)
      .use(updateImageLinks(imageFilenamesToIds))
      .use(remarkStringify)
      .process(markdownWithoutDescription)
      .then(result => result.toString());

    const postMarkdownMetadata = {
      id: data.id,
      title: data.title,
      type: data.type,
      date: data.date,
      tags: data.tags,
      postDescription: description,
      cssclasses: data.cssclasses
    };

    if (applyToPost) {
      this.post.id = postMarkdownMetadata.id;
      this.post.title = postMarkdownMetadata.title;
      this.post.type = postMarkdownMetadata.type;
      this.post.date = postMarkdownMetadata.date;
      this.post.tags = postMarkdownMetadata.tags;
      this.post.description = postMarkdownMetadata.postDescription;
      this.data = markdownWithProperIds;
      console.assert(this.post.markdown.data === this.data);
    }

    return {
      markdown: markdownWithoutDescription,
      postMarkdownMetadata
    };
  };

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
  ) {}

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

    const newPost = new Post(
      plugin,
      post.id,
      post.title,
      post.description,
      new PostMarkdown(
        plugin,
        (undefined as unknown) as Post,
        post.markdown.id,
        post.markdown.data
      ),
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
            plugin,
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
    return newPost;
  };

  /**
   * Refetch the data of the post.
   */
  refresh = async () => {
    const post = await fetch(
      `${this.plugin.settings.domain}/api/posts/${this.id}`
    )
      .then(response => response.json())
      .then(responseData => responseData.data)
      .catch(notify);

    this.id = post.id;
    this.title = post.title;
    this.description = post.description;
    this.markdown = new PostMarkdown(
      this,
      post.markdown.id,
      post.markdown.data
    );
    this.covers = post.covers;
    this.type = post.type;
    this.date = post.date;
    this.tags = post.tags;
    this.createdAt = post.createdAt;
    this.editedAt = post.editedAt;
    this.notes = post.notes;
    this.resources = post.resources.map(
      (resource: any) =>
        new PostResource(
          this,
          resource.id,
          resource.title,
          resource.filename,
          resource.url,
          resource.type,
          resource.postId,
          resource.description
        )
    );
    this.markdown.post = this;
    this.resources.forEach(resource => (resource.post = this));
  };

  /**
   * Save the post to the server.
   */
  save = async () => {
    await fetch(`${this.plugin.settings.domain}/api/posts/${this.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        secret: this.plugin.settings.secret
      },
      body: JSON.stringify({
        id: this.id,
        title: this.title,
        description: this.description,
        markdown: {
          id: this.markdown.id,
          data: this.markdown.data
        },
        covers: this.covers,
        type: this.type,
        date: this.date,
        tags: this.tags,
        createdAt: this.createdAt,
        editedAt: this.editedAt,
        notes: this.notes
      })
    }).catch(notify);
  };
}
