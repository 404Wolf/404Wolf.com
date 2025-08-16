import { App, Modal, Setting } from "obsidian";
import { v4 as uuidv4 } from "uuid";

export interface CreatePostSettings {
  id: string;
  title: string;
  type: "blog" | "project";
  date: string;
  tags: string[];
}

const DefaultCreatePostSettings: CreatePostSettings = {
  id: uuidv4(),
  title: "Super Cool Post",
  type: "blog",
  date: new Date().getFullYear().toString(),
  tags: ["hidden"],
};

export default class CreatePostModal extends Modal {
  constructor(
    app: App,
    public callback: (settings: CreatePostSettings) => void = () => {},
    public settings: CreatePostSettings = DefaultCreatePostSettings,
  ) {
    super(app);
  }

  onOpen() {
    let { contentEl } = this;
    contentEl.createEl("h1", { text: "Create a post" });

    new Setting(contentEl).setName("Post ID").addText((text) =>
      text
        .onChange((value) => {
          this.settings.id = value;
        })
        .setValue(this.settings.id),
    );

    new Setting(contentEl).setName("Post Title").addText((text) =>
      text
        .onChange((value) => {
          this.settings.title = value;
        })
        .setValue(this.settings.title),
    );

    new Setting(contentEl).setName("Post Type").addDropdown((dropdown) =>
      dropdown
        .addOptions({
          blog: "Blog",
          project: "Project",
        })
        .onChange((value) => {
          this.settings.type = value as "blog" | "project";
        })
        .setValue(this.settings.type),
    );

    new Setting(contentEl).setName("Post Date").addText((text) =>
      text
        .onChange((value) => {
          this.settings.date = value;
        })
        .setValue(this.settings.date),
    );

    new Setting(contentEl).setName("Post Tags").addTextArea((text) =>
      text
        .onChange((value) => {
          this.settings.tags = value.split(",");
        })
        .setPlaceholder("Comma sepearted tags for the post")
        .setValue(this.settings.tags.join(",")),
    );

    new Setting(contentEl).addButton((button) =>
      button.setButtonText("Create Post").onClick(() => {
        this.callback(this.settings);
        this.close();
      }),
    );
  }

  onClose() {
    let { contentEl } = this;
    contentEl.empty();
  }
}
