import { Plugin } from "obsidian";
import * as fetchPostCommands from "./obsidian/commands/fetchPosts";
import * as pushPostCommands from "./obsidian/commands/pushPost";
import ConfirmDialog from "./obsidian/modals/confirm";
import SettingsTab, {
  DEFAULT_PLUGIN_SETTINGS,
  PluginSettings
} from "./obsidian/settings";

export default class MyPlugin extends Plugin {
  settings: PluginSettings;

  async onload() {
    await this.loadSettings();

    const mkCommand = (id: string, name: string, callback: () => void) => {
      this.addCommand({ id, name, callback });
    };

    mkCommand("fetchMany", "Fetch Posts", () => {
      new ConfirmDialog(
        this.app,
        "Are you sure you want to fetch ALL posts? This is a big operation!",
        () => fetchPostCommands.fetchPosts(this)
      ).open();
    });

    mkCommand("fetchOne", "Refetch the current post", () => {
      new ConfirmDialog(
        this.app,
        "Are you sure you want to refetch this post? You will lose any changes to this post.",
        () => fetchPostCommands.fetchPost(this)
      ).open();
    });

    mkCommand("pushOne", "Push the current post", () => {
      new ConfirmDialog(
        this.app,
        "Are you sure you want to push this post? This will overwrite the post on the server.",
        () => pushPostCommands.pushPost(this)
      ).open();
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
