import { toTitleCase } from "@/utils/misc";
import Head from "next/head";
import { PrismaClient, Resource } from "@prisma/client";
import MainLayout from "@/layouts/MainLayout";
import StatusLayout from "@/layouts/StatusLayout";
import s3 from "@/utils/aws";
import Body from "./Body";

const prisma = new PrismaClient();

async function getResources(
  resources: Resource[],
): Promise<{ [key: string]: string }> {
  const resourceMap: { [key: string]: string } = {};
  for (const resource of resources) {
    resourceMap[resource.id] = resource.url;
  }
  return resourceMap;
}

const Post = async ({
  params: { type, postId },
}: {
  params: { type: string; postId: string };
}) => {
  const post = await prisma.post.findUnique({
    where: {
      id: postId as string,
    },
    include: {
      resources: true,
    },
  });
  if (!post) {
    return <StatusLayout children={<></>} name="Post not found" />;
  }

  const cover = post.covers[Math.floor(Math.random() * post.covers.length + 1)];
  const markdown = (await s3.getResource(
    post.markdown + ".md",
    "utf-8",
  )) as string;
  const resources: { [key: string]: string } = await getResources(
    post.resources,
  );

  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="keywords" content={post.tags.join(",")} />
        <meta name="description" content={post.description || "Error"} />
        <link rel="og:image" href={cover} />
      </Head>
      <MainLayout
        title={toTitleCase(post.title ?? "Error")}
        header={false}
        defaultMetadata={false}
      >
        <Body
          cover={resources[cover]}
          postId={postId}
          type={type}
          title={post.title || ""}
          description={post.description || ""}
          tags={post.tags}
          markdown={markdown}
          resources={resources}
        />
      </MainLayout>
    </>
  );
};

export default Post;
