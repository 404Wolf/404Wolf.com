import MainLayout from "@/layouts/MainLayout";
import Tile from "@/components/misc/Tiles/Tile";
import ExtendedPostCard, { PostData } from "@/components/posts/ExtendedPostCard";
import { PrismaClient } from "@prisma/client";
import postMetadata from "@/metadata/posts.json";
import { GetServerSideProps } from "next";
import { toTitleCase } from "@/utils/misc";
import { useSession } from "next-auth/react";
import { useState } from "react";

const prisma = new PrismaClient();

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    if (params && typeof params.type === "string") {
        const type = params.type;
        const posts = await prisma.post.findMany({
            where: { type: type.slice(0, -1) },
            include: { resources: true },
        });

        return {
            props: {
                type: type,
                posts: posts.map((post) => {
                    const cover = post.resources.filter(
                        (resource) => resource.id === post.covers[0]
                    )[0];
                    return {
                        coverUrl: cover?.url || null,
                        coverAlt: cover?.description || null,
                        id: post.id,
                        title: post.title,
                        description: post.description,
                        date: post.date,
                        tags: post.tags,
                    };
                }),
            },
        };
    } else {
        return {
            notFound: true,
        };
    }
};

interface PostsProps {
    type: string;
    posts: PostData[];
}

const PostsIndexLayout = ({ type, posts }: PostsProps) => {
    const session = useSession();

    const typeDescriptions: { [key: string]: string } = postMetadata.descriptions;
    const typeDescription = postMetadata.descriptions.hasOwnProperty(type)
        ? typeDescriptions[type]
        : `List of all ${type}s...`;

    const [newPostId, setNewPostId] = useState("");

    return (
        <MainLayout
            title={toTitleCase(type)}
            headerChildren={<div className="markdown">{typeDescription}</div>}
        >
            <div className="-mt-3">
                <Tile>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-7 md:gap-y-10 p-1 pt-2">
                        {session.status === "authenticated" && (
                            <ExtendedPostCard
                                editableId={true}
                                setNewPostId={setNewPostId}
                                path={`/posts/${type.slice(0, -1)}/${newPostId}/new`}
                                title={`Create a new ${type.slice(0, -1)} post!`}
                                description={`Click "Create a new ${type.slice(
                                    0,
                                    -1
                                )} post!" to set an ID for a new post. Then click in the main area of this box to automatically create the post and open up the post editor. New posts are hidden and featured by default, but you can remove the "hidden" tag and click the refresh button to publish.`}
                                date={new Date().getFullYear().toString()}
                                tags={["hidden", "featured"]}
                                key={999999}
                            />
                        )}
                        {posts &&
                            posts.map((post, key) => (
                                <ExtendedPostCard
                                    coverUrl={post.coverUrl || null}
                                    coverAlt={post.coverAlt || null}
                                    path={`/posts/${type.slice(0, -1)}/${post.id}`}
                                    title={post.title}
                                    description={post.description}
                                    date={post.date}
                                    tags={post.tags}
                                    key={key}
                                />
                            ))}
                    </div>
                </Tile>
            </div>
        </MainLayout>
    );
};

export default PostsIndexLayout;
