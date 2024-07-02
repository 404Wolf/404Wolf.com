import { App, Plugin, PluginSettingTab, Notice, Setting } from "obsidian";
import { getPost } from "./404wolf/posts";

interface MyPluginSettings {
  domain: string;
  secret: string;
}

const DEFAULT_SETTINGS: MyPluginSettings = {
  domain: "https://404wolf.com",
  secret: ""
};

export default class MyPlugin extends Plugin {
  settings: MyPluginSettings;

  async onload() {
    await this.loadSettings();

    this.addCommand({
      id: "fetch",
      name: "Fetch Posts",
      callback: () => getPost().then(data => this.createFile("test.md", data))
    });
    this.addSettingTab(new SettingsTab(this.app, this));
  }

  async loadSettings() {
    this.settings = {
      ...DEFAULT_SETTINGS,
      ...(await this.loadData())
    };
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }

  async createFile(name: string, path: string) {
    console.log("test")
    const vault = this.app.vault;
    try {
      await vault.create(name, path);
      new Notice("File created successfully!");
    } catch (error) {
      console.error("Failed to create file:", error);
      new Notice("Failed to create file.");
    }
  }
}

class SettingsTab extends PluginSettingTab {
  plugin: MyPlugin;

  constructor(app: App, plugin: MyPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;

    containerEl.empty();

    new Setting(containerEl)
      .setName("Domain")
      .setDesc("Domain of 404wolf.com instance")
      .addText(text =>
        text
          .setPlaceholder("https://")
          .setValue(this.plugin.settings.domain)
          .onChange(async value => {
            this.plugin.settings.domain = value;
            await this.plugin.saveSettings();
          })
      );

    new Setting(containerEl)
      .setName("API Key")
      .setDesc("Access key for website")
      .addText(text =>
        text.setValue(this.plugin.settings.secret).onChange(async value => {
          this.plugin.settings.secret = value;
          await this.plugin.saveSettings();
        })
      );
  }
}
