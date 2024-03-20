import { PrismaClient } from "@prisma/client";
import EditorArea from "./EditorArea";
import { redirect } from "next/navigation";
import s3 from "@/utils/aws";

const prisma = new PrismaClient();

export interface EditorResource {
    id: string;
    title: string;
    filename: string;
    type: string;
    description: string;
    url: string;
}

export interface EditorPost {
    id: string;
    title: string;
    type: string;
    tags: string[];
    description: string;
    markdown: {
        id: string;
        data: string;
    };
    covers: string[];
    date: string;
    notes: string;
}

const Editor = async ({ params: { postId, type } }: { params: { postId: string, type: string } }) => {
    const post = await prisma.post.findUnique(
        {
            where: {
                id: postId
            },
            include: {
                resources: true
            }
        }
    )

    if (post === null)
        redirect(`/posts/${type}/${postId}`)

    const markdownData = await s3.getResource(post.markdown + ".md", "utf-8") as string;

    return <EditorArea
        postId={postId}
        title={post.title || ""}
        type={post.type}
        tags={post.tags}
        description={post.description || ""}
        markdownId={post.markdown}
        markdownData={markdownData}
        covers={post.covers}
        date={post.date || "XXXX"}
        notes={post.notes || ""}
        resources={post.resources}
    />
};

export default Editor;
