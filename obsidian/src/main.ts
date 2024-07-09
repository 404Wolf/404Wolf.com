import { Plugin } from "obsidian";
import fetchPosts from "./obsidian/commands/fetchPosts";
import pushPost from "./obsidian/commands/pushPost";
import ConfirmDialog from "./obsidian/modals/confirm";
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
        const warnModal = new ConfirmDialog(
          this.app,
          "Are you sure you want to fetch ALL posts? This is a big operation!",
          () => fetchPosts(this)
        );
        warnModal.open();
      }
    });

    this.addCommand({
      id: "push",
      name: "Push the current post",
      callback: () => pushPost(this)
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
