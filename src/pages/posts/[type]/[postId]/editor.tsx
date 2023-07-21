import Head from "next/head";
import MainLayout from "@/layouts/MainLayout";
import { useEffect, useRef, useState } from "react";
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
import GotoViewer from "@/components/posts/editor/GotoViewer";
import Tile from "@/components/misc/Tiles/Tile";
import TabTile from "@/components/misc/Tiles/Tabs";
import Resource from "@/components/posts/editor/resources/Resource";
import Resources from "@/components/posts/editor/resources/Resources";
import usePushPostUpdates from "@/utils/usePushPostUpdates";
import Field from "@/components/posts/editor/Field";
import DeletePost from "@/components/posts/editor/DeletePost";

const prisma = new PrismaClient();

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    if (!params || typeof params.postId !== "string") {
        return { props: {} };
    }

    const post = await prisma.post.findUnique({
        where: { id: params.postId },
        include: { resources: true },
    });
    if (!post)
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };

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
                    id: resource.id,
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

interface EditorProps {
    post: EditorPost;
    resources: EditorResource[];
}

const Editor = ({ post, resources }: EditorProps) => {
    const session = useSession();
    const router = useRouter();
    const [ready, setReady] = useState(false);
    if (session.status === "unauthenticated") router.push(`/posts/${post.type}/${post.id}`);

    const [resourceMap, setResourceMap] = useState({});
    const [allResources, setAllResources] = useState(resources);

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
    const [currentPostId, setCurrentPostId] = useState(post.id);
    const [currentPostType, setCurrentPostType] = useState(post.type);
    const postUpdatePusher = usePushPostUpdates(postStates, currentPostId, () => {
        setCurrentPostId(postStates.id[0]);
        setCurrentPostType(postStates.type[0]);
    });

    const postMarkdownAreaRef = useRef<HTMLTextAreaElement>(null);
    const postDescriptionAreaRef = useRef<HTMLTextAreaElement>(null);
    const postTitleAreaRef = useRef<HTMLDivElement>(null);

    const forceDescriptionAreaHeightUpdate = useAutosizeTextArea(postDescriptionAreaRef.current, [
        postStates.description[0],
        ready,
    ]);
    const forceMarkdownAreaHeightUpdate = useAutosizeTextArea(postMarkdownAreaRef.current, [
        postStates.markdownData[0],
        ready,
    ]);

    useEffect(() => {
        const newResourceMap: { [key: string]: string } = {};
        for (const resource of allResources) {
            if (resource) newResourceMap[resource.id] = resource.url;
        }
        setResourceMap(newResourceMap);
    }, [allResources]);
    useEffect(() => {
        setReady(true);
    }, []);

    const markdownArea = (
        <div className="-mt-4">
            <Markdown markdown={postStates.markdownData[0]} resourceMap={resourceMap} />
        </div>
    );
    const resourceArea = (
        <Resources
            resources={allResources}
            setResources={setAllResources}
            postId={currentPostId}
            setMarkdown={(newMarkdownData: string, newMarkdownId: string) => {
                if (postMarkdownAreaRef.current) {
                    postMarkdownAreaRef.current.value = newMarkdownData;
                }
                postStates.markdownId[1](newMarkdownId);
                forceMarkdownAreaHeightUpdate();
            }}
        />
    );

    return (
        <Restricted>
            <>
                <Head>
                    <title>Post Editor</title>
                </Head>
                <MainLayout
                    title={post.title}
                    editableTitle={true}
                    onTitleEdit={(newTitle) => postStates.title[1](newTitle)}
                    titleRef={postTitleAreaRef}
                    header={false}
                    containerClasses="sm:-ml-4 lg:-mr-[7%] lg:-ml-[7%] xl:-mr-[12%] xl:-ml-[12%]"
                >
                    <div className="absolute -top-6 right-0 flex gap-1">
                        <Tags tags={postStates.tags[0]} setTags={postStates.tags[1]} />
                        <div className="-translate-y-6 scale-[90%] -mr-1">
                            <GotoViewer postId={postStates.id[0]} postType={postStates.type[0]} />
                        </div>
                        <div className="-translate-y-6 scale-[90%]">
                            <DeletePost postId={currentPostId} postType={currentPostType} />
                        </div>
                        <div className="-translate-y-6 scale-[90%]">
                            <UpdatePost postUpdateHook={postUpdatePusher} />
                        </div>
                    </div>

                    <div className="mt-[12px] overflow-visible">
                        <div className="flex mb-4 md:mb-6 gap-4">
                            <Tile
                                containerClass="relative w-1/4"
                                title="Config"
                                direction="left"
                                className="mb-6"
                                type={false}
                            >
                                <div className="flex-col pt-2">
                                    <Field
                                        name="Date"
                                        nontallWidth="w-full"
                                        border={false}
                                        startValue={post.date}
                                        setValue={postStates.date[1]}
                                    />
                                    <div className="mt-4" />
                                    <Field
                                        name="Type"
                                        nontallWidth="w-full"
                                        border={false}
                                        startValue={post.type}
                                        setValue={postStates.type[1]}
                                    />
                                    <div className="mt-4" />
                                    <Field
                                        name="Notes"
                                        tall={true}
                                        border={false}
                                        startValue={post.notes}
                                        setValue={postStates.notes[1]}
                                    />
                                </div>
                            </Tile>

                            <Tile
                                containerClass="relative w-3/4"
                                title="Overview"
                                direction="left"
                                className="mb-6"
                                type={false}
                            >
                                <textarea
                                    ref={postDescriptionAreaRef}
                                    onChange={(e) => postStates.description[1](e.target.value)}
                                    defaultValue={postStates.description[0]}
                                    className="mt-1 h-fit w-full bg-transparent overflow-auto resize-none focus:outline-none"
                                />
                            </Tile>
                        </div>

                        <div className="md:flex md:gap-4 relative">
                            <div className="absolute left-[127px] -top-3 z-50 text-sm px-[3px] bg-gray-500 rounded-xl text-white">
                                #{postStates.markdownId[0]}
                            </div>
                            <Tile
                                containerClass="relative w-1/2"
                                title="Markdown"
                                className="overflow-auto"
                                direction="left"
                                type={false}
                            >
                                <textarea
                                    className="bg-transparent resize-none overflow-visible w-full focus:outline-none"
                                    onChange={(e) => postStates.markdownData[1](e.target.value)}
                                    defaultValue={postStates.markdownData[0]}
                                    ref={postMarkdownAreaRef}
                                />
                            </Tile>

                            <div className="w-1/2">
                                <TabTile
                                    tabs={[
                                        { key: 111, name: "Preview", element: markdownArea },
                                        { key: 112, name: "Resources", element: resourceArea },
                                    ]}
                                />
                            </div>
                        </div>
                    </div>
                </MainLayout>
            </>
        </Restricted>
    );
};

export default Editor;
