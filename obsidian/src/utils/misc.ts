import { Notice } from "obsidian";

/**
 * Notify the user with a message.
 * @param {string} notification - The message to display.
 */
export async function notify(notification: string) {
	new Notice(notification);
}

/**
 * Make a codeblock.
 * Suffixes/prefixes the codeblock with \`\`\`
 * @param {string} code - The code to format.
 */
export function makeCodeBlock(language: string, code: string) {
	return `\`\`\`${language}\n${code}\n\`\`\``;
}

/**
 * Read a codeblock.
 * Removes suffix/prefixes from the codeblock, including \`\`\`
 * Also removes the language specifier.
 * @param {string} code - The code to read.
 */
export function readCodeBlock(code: string) {
	return code.replace(/^```.*\n/, "").replace(/```$/, "");
}

/**
 * Make a string titlecase
 */
export function toTitleCase(str: string) {
	return str.replace(
		/\w\S*/g,
		(txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(),
	);
}

/**
 * Hash an ArrayBuffer using SHA-256
 * @param {ArrayBuffer} buffer - The buffer to hash.
 */
export async function hashArrayBuffer(buffer: ArrayBuffer): Promise<string> {
	const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
	const hashArray = Array.from(new Uint8Array(hashBuffer));
	return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

interface MarkdownWithFrontmatter {
	frontmatter: string;
	markdown: string;
}
