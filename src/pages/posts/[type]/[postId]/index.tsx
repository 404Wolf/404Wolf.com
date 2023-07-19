import { toTitleCase } from "@/utils/misc";
import Head from "next/head";
import { useRouter } from "next/router";
import { PrismaClient } from "@prisma/client";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import MainLayout from "@/layouts/MainLayout";
import Tile from "@/components/misc/Tiles/Tile";
import Image from "next/image";
import Markdown from "@/markdown/Markdown.jsx";
import Tags from "@/components/posts/Tags";
import GotoEditor from "@/components/posts/editor/GotoEditor";
import { useSession } from "next-auth/react";
import DeletePost from "@/components/posts/editor/DeletePost";

const prisma = new PrismaClient();

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
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
                title: post.title,
                cover: resources[post.covers[0]] || null,
                description: post.description,
                tags: post.tags,
                markdown: markdown,
                resources: resources,
            },
        };
    } else {
        return { props: {} };
    }
};

interface PostProps {
    type: string;
    id: string;
    title: string;
    cover: string;
    description: string;
    tags: string[];
    markdown: string;
    resources: { [key: string]: string };
}

const Post = ({ type, id, title, cover, description, tags, markdown, resources }: PostProps) => {
    const session = useSession();

    return (
        <>
            <Head>
                <title>{`${type}/${id}`}</title>
            </Head>
            <MainLayout title={toTitleCase(title)} header={false}>
                <div className="mt-[12px] overflow-visible">
                    {session.status === "authenticated" && (
                        <div className="absolute -top-12 -right-4 scale-[90%] flex gap-3">
                            <DeletePost postId={id} postType={type} />
                            <GotoEditor postId={id} postType={type} />
                        </div>
                    )}

                    <Tile title="Overview" direction="right">
                        <div className="h-fit overflow-auto">
                            {cover && (
                                <div className="relative pointer-events-none rounded-xl w-2/5 sm:w-1/4 sm:mt-4 sm:ml-2 float-right">
                                    <Image
                                        width={400}
                                        height={400}
                                        src={cover}
                                        className="border-4 border-slate-500 rounded-xl"
                                        alt={`${title}'s cover image`}
                                    />
                                </div>
                            )}
                            <div className="-mt-1">{description}</div>
                        </div>
                    </Tile>

                    <div className="brightness-[125%] absolute left-2 -translate-y-6 z-50">
                        <Tags tags={tags} readOnly={true} />
                    </div>

                    <div className="m-6" />

                    <Tile className="overflow-auto" title={title} direction="right">
                        <div className="-mt-4">
                            <Markdown markdown={markdown} resourceMap={resources} />
                        </div>
                    </Tile>
                </div>
            </MainLayout>
        </>
    );
};

export default Post;
