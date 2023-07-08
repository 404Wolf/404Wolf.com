import { PrismaClient } from ".prisma/client";
import { readFileSync, readdirSync } from "fs";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { unCamelCase } from "./utils";

const prisma = new PrismaClient();
const s3 = {
    client: new S3Client({ region: "us-east-2" }),
    bucket: "wolf-mermelstein-personal-website",
    region: "us-east-2",
};
const config = {
    overwriteS3Files: false,
};

const getObjectUrl = (key: string) => `https://${s3.bucket}.s3.${s3.region}.amazonaws.com/${key}`;

function getPosts(type: string) {
    const getMarkdown = (type: string, id: string) => {
        const key = `${id}_0001.md`;
        const path = `./posts/${type}s/${id}/post.md`;
        return {
            id: `${id}_0001`,
            name: key,
            type: "markdown",
            url: getObjectUrl(key),
            path: path,
            data: readFileSync(path, "utf-8"),
        };
    };

    const getResources = (type: string, id: string) =>
        readdirSync(`./posts/${type}s/${id}/resources`).map((resource) => {
            const [fileName, fileExtension] = resource.split(".");
            const path = `./posts/${type}s/${id}/resources/${resource}`;
            return {
                id: fileName,
                name: resource,
                type: "image",
                url: getObjectUrl(resource),
                path: path,
                data: readFileSync(path),
            };
        });

    return JSON.parse(readFileSync(`./posts/${type}s/posts.json`, "utf-8")).map(
        (post: string) => {
            const baseUrl = `./posts/${type}s/${post}`;
            const metadata = JSON.parse(readFileSync(`${baseUrl}/post.json`, "utf-8"));
            const covers = metadata.covers.map((cover: string) => cover.split(".")[0]) || [];
            const resources = getResources(type, post);
            const markdown = getMarkdown(type, post);
            for (const resource of resources) {
                markdown.data = markdown.data.replaceAll(resource.name, resource.id);
            }

            return {
                id: post,
                title: metadata.name || unCamelCase(post),
                description: metadata.description || "Post in progress...",
                markdown: markdown,
                covers: covers,
                type: type,
                date: metadata.date || undefined,
                tags: metadata.tags || [],
                createdAt: new Date(Date.now()),
                editedAt: new Date(Date.now()),
                resources: resources,
            };
        }
    );
}

(async () => {
    const posts = getPosts("blog");

    for (const post of posts) {
        // Log that the post is being processed.
        console.log(`Processing post ${post.id}...`);

        for (const resource of [...post.resources, post.markdown]) {
            // Log that the resource is being processed.
            console.log(`Processing resource ${resource.name}...`);
            console.log(resource);

            // First check to see if the resource is already in the s3. If a fetch for the
            // resource does not result in a 200 status code, it's not in the bucket yet.
            const uploaded = (await fetch(resource.url)).status == 200;
            if (!uploaded || config.overwriteS3Files) {
                // Add the resource to the S3 bucket
                const request = new PutObjectCommand({
                    Body: resource.data,
                    Bucket: s3.bucket,
                    Key: resource.name,
                });

                // Make sure that the request to upload the resource resulted in the
                // resource successfully being uploaded.
                if ((await s3.client.send(request)).$metadata.httpStatusCode !== 200)
                    throw new Error(`Resource ${resource.name} was unable to be uploaded.`);

                // Log that the upload was successful
                console.log("Successfully uploaded resource.");
            } else {
                console.log("Resource was already found in bucket.");
            }

            // Add the resource to the database.
            try {
                await prisma.resource.create({
                    data: {
                        id: resource.id,
                        title: resource.name.split(".")[0],
                        filename: resource.name,
                        url: resource.url,
                        type: resource.type,
                    },
                });
                console.log("Added resource to database.");
            } catch (error) {
                if (error instanceof PrismaClientKnownRequestError)
                    console.log("Resource already found in database.");
            }
        }

        try {
            await prisma.post.create({
                data: {
                    id: post.id,
                    title: post.title,
                    description: post.description,
                    markdown: post.markdown.name.split(".")[0],
                    covers: post.covers,
                    type: post.type,
                    date: post.date,
                    tags: post.tags,
                    createdAt: post.createdAt,
                    editedAt: post.editedAt,
                    resources: {
                        connect: [...post.resources, post.markdown].map(
                            (resource: { id: string }) => ({
                                id: resource.id,
                            })
                        ),
                    },
                },
            });
            console.log("Added post to database.");
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError)
                console.log("Post already found in database.");
            else throw error;
        }
    }
})();
