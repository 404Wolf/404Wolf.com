import { toTitleCase } from "@/utils/misc";
import Head from "next/head";
import MainLayout from "@/layouts/MainLayout";
import Tile from "@/components/misc/Tile";
import { useEffect, useReducer, useRef, useState } from "react";
import Markdown from "@/markdown/Markdown";
import TagsInput from "react-tagsinput";
import useAutosizeTextArea from "@/utils/useAutosizeTextArea";
import { useSession } from "next-auth/react";
import Restricted from "@/layouts/Restricted";
import { PrismaClient } from "@prisma/client";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import UpdatePost from "@/components/posts/editor/UpdatePost";
import Tags from "@/components/posts/Tags";

const prisma = new PrismaClient();

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    if (!params || typeof params.postId !== "string") {
        return { props: {} };
    }

    const post = await prisma.post.findUnique({
        where: { id: params.postId },
        include: { resources: true },
    });

    if (post) {
        const markdown = {
            id: post.markdown,
            data: await fetch(
                post.resources.filter((resource) => resource.id === post.markdown)[0].url
            ).then((resp) => resp.text()),
        };
        return {
            props: {
                post: {
                    id: post.id,
                    title: post.title,
                    type: post.type,
                    tags: post.tags,
                    description: post.description,
                    markdown: markdown,
                    covers: post.covers,
                    date: post.date,
                    notes: post.notes,
                },
                resources: post.resources.map((resource) => ({
                    ref: resource.id,
                    title: resource.title,
                    filename: resource.filename,
                    type: resource.type,
                    description: resource.description,
                    url: resource.url,
                })),
            },
        };
    } else return { props: {} };
};

interface EditorProps {
    post: {
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
    };
    resources: {
        ref: string;
        title: string;
        filename: string;
        type: string;
        description: string;
        url: string;
    }[];
}

const Editor = ({ post, resources }: EditorProps) => {
    const session = useSession();
    const router = useRouter();
    if (session.status === "unauthenticated") router.push(`/posts/${post.type}/${post.id}`);

    const [resourceMap, setResourceMap] = useState({});

    const postStates = {
        id: useState(post.id),
        title: useState(post.title),
        type: useState(post.type),
        tags: useState(post.tags),
        description: useState(post.description),
        markdownId: useState(post.markdown.id),
        markdownData: useState(post.markdown.data),
        covers: useState(post.covers),
        date: useState(post.date),
        notes: useState(post.notes),
    };

    const postMarkdownAreaRef = useRef<HTMLTextAreaElement>(null);
    const postDescriptionAreaRef = useRef<HTMLTextAreaElement>(null);
    const postTitleAreaRef = useRef<HTMLDivElement>(null);

    const forcePostDescriptionResize = useAutosizeTextArea(
        postDescriptionAreaRef.current,
        postStates.description[0]
    );
    const forcePostMarkdownResize = useAutosizeTextArea(
        postMarkdownAreaRef.current,
        postStates.markdownData[0]
    );

    useEffect(() => {
        if (postMarkdownAreaRef.current) {
            postMarkdownAreaRef.current.value = post.markdown.data;

            if (postDescriptionAreaRef.current) {
                postDescriptionAreaRef.current.value = post.description;
            }

            if (postTitleAreaRef.current) {
                postTitleAreaRef.current.innerText = post.title;
            }

            forcePostDescriptionResize();
            forcePostMarkdownResize();
        } else {
            window.addEventListener("resize", forcePostDescriptionResize);
            window.addEventListener("resize", forcePostMarkdownResize);
            return () => {
                window.removeEventListener("resize", forcePostDescriptionResize);
                window.removeEventListener("resize", forcePostMarkdownResize);
            };
        }
    }, [postMarkdownAreaRef.current]);

    useEffect(() => {
        const newResourceMap: { [key: string]: string } = {};
        for (const resource of resources) {
            newResourceMap[resource.ref] = resource.url;
        }
        setResourceMap(newResourceMap);
    }, [resources]);

    return (
        <Restricted>
            <>
                <Head>
                    <title>Post Editor</title>
                </Head>
                <MainLayout
                    title={"Title"}
                    editableTitle={true}
                    onTitleEdit={(newTitle) => postStates.title[1](newTitle)}
                    titleRef={postTitleAreaRef}
                    header={false}
                    containerClasses="sm:-ml-4 lg:-mr-[10%] lg:-ml-[10%] xl:-mr-[16%] xl:-ml-[16%]"
                >
                    <div className="absolute -translate-y-11 -right-4 flex gap-2">
                        <Tags tags={postStates.tags[0]} setTags={postStates.tags[1]} />
                        
                        <div className="-translate-y-9 scale-[90%]">
                            <UpdatePost postStates={postStates} />
                        </div>
                    </div>

                    <div className="mt-[12px] overflow-visible">
                        <div className="flex mb-4 md:mb-6 gap-4">
                            <Tile
                                containerClass="relative w-1/4"
                                title="Config"
                                direction="left"
                                className="mb-6"
                            >
                                (placeholder)
                            </Tile>

                            <Tile
                                containerClass="relative w-3/4"
                                title="Overview"
                                direction="left"
                                className="mb-6"
                            >
                                <textarea
                                    ref={postDescriptionAreaRef}
                                    onChange={(e) => postStates.description[1](e.target.value)}
                                    className="mt-1 h-fit w-full bg-transparent overflow-auto resize-none focus:outline-none"
                                />
                            </Tile>
                        </div>

                        <div className="md:flex md:gap-4 relative">
                            <Tile
                                containerClass="relative w-full md:w-1/2"
                                title="Markdown"
                                className="overflow-auto"
                                direction="left"
                            >
                                <textarea
                                    className="bg-transparent resize-none overflow-visible w-full focus:outline-none"
                                    onChange={(e) => postStates.markdownData[1](e.target.value)}
                                    ref={postMarkdownAreaRef}
                                />
                            </Tile>

                            <div className="hidden md:contents">
                                <Tile
                                    containerClass="relative w-1/2"
                                    className="overflow-auto"
                                    title="Preview"
                                    direction="left"
                                >
                                    <div className="-mt-4">
                                        <Markdown
                                            markdown={postStates.markdownData[0]}
                                            resourceMap={resourceMap}
                                        />
                                    </div>
                                </Tile>
                            </div>
                        </div>
                    </div>
                </MainLayout>
            </>
        </Restricted>
    );
};

export default Editor;
