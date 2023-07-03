import PostLayout from "@/layouts/PostLayout";
import { toTitleCase } from "@/utils/misc";
import Head from "next/head";
import { useRouter } from "next/router";
import { PrismaClient } from "@prisma/client";
import { GetStaticPaths, GetStaticProps } from "next";
import MainLayout from "@/layouts/MainLayout";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import Tile from "@/components/misc/Tile";
import Image from "next/image";
import Markdown from "@/markdown/markdown";

const prisma = new PrismaClient();

export const getStaticProps: GetStaticProps = async ({ params }) => {
    if (!params) {
        return { props: {} };
    }

    const post = await prisma.post.findUnique({
        where: {
            id: params.postId as string,
        },
        include: {
            resources: true,
        },
    });

    if (post) {
        const resources: { [key: string]: string } = {};
        for (const resource of post.resources) {
            resources[resource.id] = resource.url;
        }

        const markdown = await fetch(resources[post.markdown]).then((res) => res.text());

        return {
            props: {
                type: params.type,
                id: params.postId,
                title: post?.title,
                cover: resources[post.covers[0]],
                description: post?.description,
                markdown: markdown,
                resources: resources,
            },
        };
    } else {
        return { props: {} };
    }
};

export const getStaticPaths = async () => {
    const paths: any[] = [];
    (await prisma.post.findMany()).forEach((post) => {
        paths.push({
            params: {
                postId: post.id,
                post: post,
                type: post.type,
            },
        });
    });

    return {
        paths,
        fallback: false,
    };
};

interface PostProps {
    type: string;
    id: string;
    title: string;
    cover: string;
    description: string;
    markdown: string;
    resources: { [key: string]: string };
}

const Post = ({ type, id, title, cover, description, markdown, resources }: PostProps) => {
    return (
        <>
            <Head>
                <title>{`${type}/${id}`}</title>
            </Head>
            <MainLayout title={toTitleCase(title)} header={false}>
                <div className="mt-[5px]">
                    <Tile title="Overview" className="overflow-auto" direction="right">
                        <div className="relative pointer-events-none rounded-xl w-2/5 md:w-1/4 mt-2 ml-px md:ml-3 mb-px md:mb-3 float-right">
                            <Image
                                width={400}
                                height={400}
                                src={cover}
                                className="border-4 border-slate-500 rounded-xl"
                                alt={`${title}'s cover image`}
                            />
                        </div>
                        <div className="markdown">{description}</div>
                    </Tile>

                    <div className="m-6" />
                    <Tile className="overflow-auto" title={title} direction="right">
                        <div>
                            <Markdown markdown={markdown} resourceMap={resources} />
                        </div>
                    </Tile>
                </div>
            </MainLayout>
        </>
    );
};

export default Post;
