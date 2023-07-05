import Head from "next/head";
import typeDescriptions from "@/metadata/types.json";
import MainLayout from "@/layouts/MainLayout";
import Tile from "@/components/misc/Tile";
import { useEffect, useState } from "react";
import ExtendedPostCard from "@/components/posts/ExtendedPostCard";
import { Prisma, PrismaClient } from "@prisma/client";
import { GetServerSideProps, GetStaticPaths, GetStaticPathsResult } from "next";

const prisma = new PrismaClient();

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const type: string | null = params
        ? typeof params.type === "string"
            ? params.type
            : null
        : null;

    const posts = await prisma.post.findMany({
        where: { type: type?.slice(0, -1) || "" },
    });
    const covers: string[] = await Promise.all(
        posts
            .map((post) => post.covers)
            .flatMap((coverId) =>
                typeof coverId === "string"
                    ? prisma.resource.findUnique({ where: { id: coverId } })
                    : null
            )
            .filter((cover) => typeof cover === "object")
    );

    return {
        props: {
            type: type,
            posts: posts,
            covers: covers,
        },
    };
};

interface PostsProps {
    type: string;
    posts: Prisma.PostSelect[];
    covers: Prisma.ResourceSelect[]
}

const PostsIndexLayout = ({ type, posts, covers }: PostsProps) => {
    return (
        <MainLayout
            title={type}
            headerChildren={<div className="markdown">typeDescriptions[type]</div>}
        >
            <div className="-mt-3">
                <Tile>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-7 md:gap-y-10 p-1 pt-2">
                        {posts &&
                            posts.map((post) => (
                                <ExtendedPostCard tags={post.tags} post={post} />
                            ))}
                    </div>
                </Tile>
            </div>
        </MainLayout>
    );
};

export default PostsIndexLayout;
