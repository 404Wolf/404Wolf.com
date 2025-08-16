import { Modal, App, Setting } from "obsidian";

export default class ConfirmDialog extends Modal {
	callback: () => void;
	warningMsg: string;

	constructor(app: App, warningMsg: string, callback: () => void) {
		super(app);
		this.warningMsg = warningMsg;
		this.callback = callback;
	}

	onOpen() {
		const { contentEl } = this;
		contentEl.createEl("h2", { text: "Are you sure?" });
		contentEl.createEl("p", { text: this.warningMsg });

		new Setting(contentEl)
			.addButton((btn) =>
				btn.setButtonText("Yes").onClick(() => {
					console.log("Confirmation dialog chosen action was APPROVE");
					this.callback();
					this.close();
				}),
			)
			.addButton((btn) =>
				btn.setButtonText("No").onClick(() => {
					console.log("Confirmation dialog chosen action was CANCEL");
					this.close();
				}),
			);
	}

	onClose() {
		const { contentEl } = this;
		contentEl.empty();
	}
}
