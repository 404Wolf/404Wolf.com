import { PrismaClient } from "@prisma/client";
import s3 from "@/utils/aws";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

async function createNewPost(
  newPostId: string,
  newPostType: string,
  date: string,
) {
  let markdownId = `${newPostId}_00001`;

  // Attempt to see if markdown exists and while it does tick up the id
  while (
    (await s3.checkResource(markdownId + ".md")) ||
    (await prisma.resource.findUnique({ where: { id: markdownId } })) !== null
  ) {
    const id = parseInt(markdownId.split("_")[1]) + 1;
    markdownId = `${newPostId}_${id.toString().padStart(5, "0")}`;
  }

  // Create the new post markdown resource
  await s3.addResource(markdownId + ".md", "", "str", "text/plain");

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
  });
}

const NewPost = async ({
  params: { postId, type },
}: {
  params: { postId: string; type: string };
}) => {
  await createNewPost(postId, type, new Date().getFullYear().toString());
  redirect(`/posts/${type}/${postId}`);
};

export default NewPost;
