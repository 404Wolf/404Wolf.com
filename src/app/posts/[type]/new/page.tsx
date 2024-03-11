import { useRouter } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import s3 from "@/utils/aws";

const prisma = new PrismaClient();

async function createNewPost(newPostId: string, newPostType: string, date: string) {
    const markdownId = `${newPostId}_00001`;
    const resourceData = await s3.getResource(markdownId + ".md", "utf-8");
    if (resourceData === "" || resourceData === null) {
        await s3.addResource(markdownId + ".md", "", "str", "text/plain");
    }

    await prisma.post.create({
        data: {
            id: newPostId,
            title: newPostId,
            description: "",
            markdown: markdownId,
            covers: [],
            type: newPostType,
            date: date,
            tags: [],
            notes: "",
            resources: {
                create: [
                    {
                        id: markdownId,
                        title: "Post Markdown",
                        filename: markdownId + ".md",
                        url: s3.resourceUrl(markdownId + ".md"),
                        type: "markdown",
                    },
                ],
            },
        },
    })
};

const NewPost = ({ params: { newPostId, newPostType } }:
    { params: { newPostId: string, newPostType: string } }) => {
    const router = useRouter();

    createNewPost(newPostId, newPostType, new Date().getFullYear().toString());
    router.push(`/posts/${newPostType}/${newPostId}`);
};

export default NewPost;
