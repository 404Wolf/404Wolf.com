import { App, PluginSettingTab, Setting } from "obsidian";
import MyPlugin from "src/main";

export interface PluginSettings {
  domain: string;
  secret: string;
  path: string;
}

export const DEFAULT_PLUGIN_SETTINGS: PluginSettings = {
  domain: "https://404wolf.com",
  secret: "",
  path: "404Wolf",
};

export default class SettingsTab extends PluginSettingTab {
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

    new Setting(containerEl)
      .setName("Path")
      .setDesc("Path to store posts for 404Wolf")
      .addText(text =>
        text.setValue(this.plugin.settings.path).onChange(async value => {
          this.plugin.settings.path = value;
          await this.plugin.saveSettings();
        })
      );
  }
}
