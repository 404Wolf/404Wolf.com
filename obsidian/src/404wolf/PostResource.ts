import MyPlugin from "src/main";
import { notify } from "src/utils/misc";
import Post from "./Post";

export class PostResource {
  constructor(
    public plugin: MyPlugin,
    public id: string,
    public title: string,
    public filename: string,
    public url: string,
    public type: string,
    public postId: string,
    public description: string | null,
  ) {}

  /**
   * Fetch metadata about a resource from the resource ID.
   * @param {Post} plugin The post that the resource belongs to.
   * @param {string} id The ID of the resource to fetch.
   */
  static fromResourceId = async (plugin: MyPlugin, id: string) => {
    const resource = await fetch(
      `${plugin.settings.domain}/api/resources/${id}`,
    )
      .then((response) => response.json())
      .then((responseData) => responseData.data)
      .catch(notify);
    return new PostResource(
      plugin,
      resource.id,
      resource.title,
      resource.filename,
      resource.url,
      resource.type,
      resource.postId,
      resource.description,
    );
  };

  /**
   * Fetch the data of a resource.
   * @return {Promise<ArrayBuffer>}
   */
  getData = async (): Promise<ArrayBuffer> => {
    const link = await fetch(
      `${this.plugin.settings.domain}/api/resources/${this.id}/link`,
    )
      .then((response: any) => response.json())
      .then((resource) => resource.url)
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
    description: string,
  ): Promise<void> => {
    const uploadUrl: string = await fetch(
      `${plugin.settings.domain}/api/resources/${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          secret: plugin.settings.secret,
        },
        body: JSON.stringify({
          title,
          filename,
          type,
          description,
          postId: post.id,
        }),
      },
    )
      .then((resp) => resp.json())
      .then((data) => data.uploadUrl)
      .catch(() => notify("Failed to create resource"));
    await fetch(uploadUrl, {
      method: "PUT",
      body: data,
    }).catch(() => notify("Failed to upload resource"));
  };
}
