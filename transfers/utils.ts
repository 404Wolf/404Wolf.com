import { writeFileSync } from "fs";

export function unCamelCase(string: string): string {
	// Split the input string into words based on camel case
	const words = string.split(/(?=[A-Z])/);

	// Convert the first character of each word to uppercase and join them with spaces
	const titleCase = words
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");

	return titleCase;
}

export async function downloadFile(url: string, path: string) {
	const req = await fetch(url);
	const blob = await req.blob();
	const arrBuffer = await blob.arrayBuffer();
	const buffer = Buffer.from(arrBuffer);
	writeFileSync(path, buffer);
}
