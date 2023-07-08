import { PrismaClient } from ".prisma/client";
import { readdirSync, mkdirSync, writeFileSync } from "fs";
import { downloadFile } from "./utils.ts";

const prisma = new PrismaClient();

if (!readdirSync("./").includes("output")) mkdirSync("output");

(async () => {
    const posts = await prisma.post.findMany({ include: { resources: true } });
    const types = new Set(posts.map((post) => post.type));

    // Create listing of all types in directory.
    writeFileSync("output/types.json", JSON.stringify([...types], null, 4));
    console.log("Created listing of all post types.");

    // Create a json that has a list of all the posts.
    types.forEach((type) => {
        // Make a directory for the post type if it doesn't already exist.
        if (!readdirSync(`output`).includes(`${type}s`)) mkdirSync(`output/${type}s`);
        else console.log(`Post type ${type} already has a directory.`);

        // For each type create listing of all posts in directory.
        writeFileSync(
            `output/${type}s/posts.json`,
            JSON.stringify(
                posts.filter((post) => post.type === type).map((post) => post.id),
                null,
                4
            )
        );
        console.log(`Created listing of all posts of type ${type}.`);
    });

    for (const post of posts) {
        const basePath = `output/${post.type}s/${post.id}`;

        // Log that the post is being processed.
        console.log(`Processing post ${post.id}...`);

        // Make a folder for the project.
        if (!readdirSync(`output`).includes(post.id)) mkdirSync(basePath);
        else console.log("Post already has a folder.");

        // Dump the project metadata.
        writeFileSync(`${basePath}/post.json`, JSON.stringify(post, null, 4));
        console.log("Dumped project metadata.");

        // Create a resource folder and dump all the post resources.
        if (!readdirSync(`${basePath}`).includes("resources")) mkdirSync(`${basePath}/resources`);

        // Download the file markdown.
        await downloadFile(
            post.resources.filter((resource) => resource.id === post.markdown)[0].url,
            `${basePath}/post.md`
        );
        console.log("Downloaded post markdown.");

        // Download all the resources of the project.
        for (const resource of post.resources.filter((post) => !post.filename.endsWith(".md"))) {
            await downloadFile(resource.url, `${basePath}/resources/${resource.filename}`);
            console.log(`Downloaded resource ${resource.id}`);
        }
        console.log("Downloaded resources.");
    }
})();
