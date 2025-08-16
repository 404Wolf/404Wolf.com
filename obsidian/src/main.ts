import { Plugin } from "obsidian";
import * as syncPostsCommands from "./obsidian/commands/syncPosts";
import * as pushPostsCommands from "./obsidian/commands/pushPosts";
import * as createPostsCommands from "./obsidian/commands/createPosts";
import * as deletePostsCommands from "./obsidian/commands/deletePosts";
import * as aboutCommands from "./obsidian/commands/about";
import ConfirmDialog from "./obsidian/modals/confirm";
import SettingsTab, {
	DEFAULT_PLUGIN_SETTINGS,
	PluginSettings,
} from "./obsidian/settings";
import gotoCurrentPost from "./obsidian/commands/goto";

export default class MyPlugin extends Plugin {
	settings: PluginSettings;

	async onload() {
		await this.loadSettings();

		const mkCommand = (id: string, name: string, callback: () => void) => {
			this.addCommand({ id, name, callback });
		};

		mkCommand("fetchMany", "Sync Posts", () => {
			new ConfirmDialog(
				this.app,
				"Are you sure you want to fetch ALL posts? This is a big operation!",
				() => syncPostsCommands.syncPosts(this),
			).open();
		});

		mkCommand("fetchOne", "Refetch the current post", () => {
			new ConfirmDialog(
				this.app,
				"Are you sure you want to refetch this post? You will lose any changes to this post.",
				() => syncPostsCommands.syncPost(this),
			).open();
		});

		mkCommand("pushOne", "Push current post", () => {
			new ConfirmDialog(
				this.app,
				"Are you sure you want to push this post? This will overwrite the post on the server.",
				() => pushPostsCommands.pushPost(this),
			).open();
		});

		mkCommand("createPost", "Create a new post", () => {
			createPostsCommands.createPost(this);
		});

		mkCommand("deletePost", "Delete current post", () => {
			new ConfirmDialog(
				this.app,
				"Are you sure you want to delete the current post?" +
					"This is not reversable and the post will be gone forever.",
				() => deletePostsCommands.deletePost(this),
			).open();
		});

		mkCommand("openPost", "Go to post webpage", () => gotoCurrentPost(this));

		mkCommand("fetchBio", "Sync Bio", () => {
			new ConfirmDialog(
				this.app,
				"Are you sure you want to fetch the bio? This will overwrite the bio in the vault.",
				() => aboutCommands.sync(this),
			).open();
		});

		mkCommand("pushBio", "Push Bio", () => {
			new ConfirmDialog(
				this.app,
				"Are you sure you want to push the bio? This will overwrite the bio on the server.",
				() => aboutCommands.push(this),
			).open();
		});

		this.addSettingTab(new SettingsTab(this.app, this));
	}

	async loadSettings() {
		this.settings = {
			...DEFAULT_PLUGIN_SETTINGS,
			...(await this.loadData()),
		};
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
