import { build } from "esbuild";

build({
  entryPoints: ["src/main.ts"],
  bundle: true,
  outfile: "dist/bundle.js",
  minify: true,
  sourcemap: true,
  external: ["obsidian"]
}).catch(() => process.exit(1));
