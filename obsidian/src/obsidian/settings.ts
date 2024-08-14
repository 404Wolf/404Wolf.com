import { App, PluginSettingTab, Setting } from "obsidian";
import MyPlugin from "src/main";

export interface PluginSettings {
  domain: string;
  secret: string;
  path: string;
  devMode: boolean;
}

export const DEFAULT_PLUGIN_SETTINGS: PluginSettings = {
  domain: "https://404wolf.com",
  secret: "",
  path: "404Wolf",
  devMode: false
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

    const mkSetting = (
      name: string,
      desc: string,
      value: string,
      callback: (value: string) => void
    ) => {
      new Setting(containerEl)
        .setName(name)
        .setDesc(desc)
        .addText(text =>
          text.setValue(value).onChange(async value => {
            callback(value);
            await this.plugin.saveSettings();
          })
        );
    };

    mkSetting(
      "Domain",
      "Domain of 404wolf.com instance",
      this.plugin.settings.domain,
      (value: string) => (this.plugin.settings.domain = value)
    );

    mkSetting(
      "API Key",
      "Access key for website",
      this.plugin.settings.secret,
      (value: string) => (this.plugin.settings.secret = value)
    );

    mkSetting(
      "Path",
      "Path to store posts for 404Wolf",
      this.plugin.settings.path,
      (value: string) => (this.plugin.settings.path = value)
    );

    new Setting(containerEl)
      .setName("Development Mode")
      .setDesc("Enable development mode")
      .addToggle(toggle =>
        toggle.setValue(this.plugin.settings.devMode).onChange(async value => {
          this.plugin.settings.devMode = value;
          await this.plugin.saveSettings();
        })
      );
  }
}
