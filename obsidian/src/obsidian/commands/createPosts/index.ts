import * as path from "path";
import Post from "src/404wolf/Post";
import MyPlugin from "src/main";
import { notify, toTitleCase } from "src/utils/misc";
import PostSyncer from "../syncPosts/PostSyncer";
import CreatePostModal, { CreatePostSettings } from "./CreatePostModal";

export async function createPost(plugin: MyPlugin) {
  const createPostCallback = async (chosenPostSettings: CreatePostSettings) => {
    const posts = await Post.getAllPostIds(plugin);
    if (posts.includes(chosenPostSettings.id)) {
      notify("Post ID already exists");
      return;
    }

    const newPost = await Post.fromNew(plugin, {
      id: chosenPostSettings.id,
      title: chosenPostSettings.title,
      description: "",
      date: chosenPostSettings.date,
      notes: "",
      tags: chosenPostSettings.tags,
      type: chosenPostSettings.type
    });
    notify("Created new post record.");

    const newPostPath = [
      plugin.settings.path,
      "Posts",
      toTitleCase(newPost.type) + "s"
    ];
    const postFetcher = new PostSyncer(newPostPath, plugin, newPost);
    await postFetcher.fetchPost({});
    notify("Fetched new post content");

    const newPostMarkdown = plugin.app.vault.getFileByPath(
      path.join(...newPostPath, newPost.id, `${newPost.title}.md`)
    )!;
    const newLeaf = plugin.app.workspace.getLeaf();
    newLeaf.openFile(newPostMarkdown);
  };
  const createPostModal = new CreatePostModal(plugin.app, createPostCallback);
  createPostModal.open();
}
