import MyPlugin from "src/main";
import { notify } from "src/utils/misc";
import { PostMarkdown } from "./PostMarkdown";
import { PostResource } from "./PostResource";

interface NewPostParams {
  id: string;
  title: string;
  description: string;
  type: string;
  date: string;
  tags: string[];
  notes: string;
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
   * Make a new Post object from the parameters of a new post.
   * @param {MyPlugin} plugin The Obsidian plugin object.
   * @param {NewPostParams} params The parameters of the new post.
   */
  static fromNew = async (plugin: MyPlugin, params: NewPostParams) => {
    const response = await fetch(
      `${plugin.settings.domain}/api/posts/${params.id}`,
      {
        method: "POST",
        body: JSON.stringify(params),
        headers: { secret: plugin.settings.secret }
      }
    );
    if (!response.ok) {
      throw new Error("Failed to create post.");
    }
    return Post.fromId(plugin, params.id);
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
      this.plugin,
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
          this.plugin,
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

  /**
   * Delete the post from the server.
   */
  delete = async () => {
    const resp = await fetch(
      `${this.plugin.settings.domain}/api/posts/${this.id}`,
      {
        method: "DELETE",
        headers: {
          secret: this.plugin.settings.secret
        }
      }
    ).catch(notify);

    if (!resp || !resp.ok) {
      throw new Error("Failed to delete post.");
    }
  };
}
