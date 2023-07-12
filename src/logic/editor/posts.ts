import { PrismaClient } from "@prisma/client";
import { addResource, checkResource, resourceUrl } from "../aws";
import { Post, Resource } from "@/logic/editor/types";

const prisma = new PrismaClient();

export async function createBlankPost(id: string) {
    const post: Post = {
        id: id,
        title: id,
        description: "",
        markdown: "",
        type: "unset",
        date: (new Date().getFullYear()).toString(),
    };

    await uploadPost(post);
}

export async function uploadPost(post: Post) {
    await prisma.post.create({
        data: {
            id: post.id,
            title: post.title,
            description: post.description,
            markdown: `${post.id}_00001`,
            covers: post.covers,
            type: post.type,
            editedAt: new Date(Date.now()),
            notes: post.notes,
            resources: {
                create: [
                    {
                        id: `${post.id}_00001`,
                        title: "Post Markdown",
                        filename: `${post.id}_0001.md`,
                        url: resourceUrl(`${post.id}_0001.md`),
                        type: "markdown",
                    },
                ],
            },
        },
    });

    addResource(`${post.id}_00001.md`, post.markdown);
}
