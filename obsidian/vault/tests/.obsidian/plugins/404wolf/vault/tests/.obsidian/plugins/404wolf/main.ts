import { App, Plugin, PluginSettingTab, Setting } from "obsidian";

// Remember to rename these classes and interfaces!

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
			id: "open-sample-modal-simple",
			name: "Open sample modal (simple)",
			callback: () => {}
		});
		this.addSettingTab(new SampleSettingTab(this.app, this));
	}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData()
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class SampleSettingTab extends PluginSettingTab {
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
				text
					.setValue(this.plugin.settings.secret)
					.onChange(async value => {
						this.plugin.settings.secret = value;
						await this.plugin.saveSettings();
					})
			);
	}
}
