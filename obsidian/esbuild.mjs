import { build } from "esbuild";
import fs from "fs/promises";

const isProduction = process.env.NODE_ENV === "production";

build({
	entryPoints: ["src/main.ts"],
	bundle: true,
	outfile: "dist/main.js",
	minify: isProduction,
	sourcemap: true,
	external: ["obsidian"],
	logLevel: "info",
	platform: "node",
})
	.then(() => {
		return fs.copyFile("manifest.json", "dist/manifest.json");
	})
	.catch(() => process.exit(1));
