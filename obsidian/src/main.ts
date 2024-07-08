import { Plugin } from "obsidian";
import fetchPosts from "./obsidian/commands/fetchPosts";
import SettingsTab, {
  DEFAULT_PLUGIN_SETTINGS,
  PluginSettings
} from "./obsidian/settings";

export default class MyPlugin extends Plugin {
  settings: PluginSettings;

  async onload() {
    await this.loadSettings();

    this.addCommand({
      id: "fetch",
      name: "Fetch Posts",
      callback: () => {
        fetchPosts(this.app.vault, this.settings.path, this.settings.domain);
      }
    });
    this.addSettingTab(new SettingsTab(this.app, this));
  }

  async loadSettings() {
    this.settings = {
      ...DEFAULT_PLUGIN_SETTINGS,
      ...(await this.loadData())
    };
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}
