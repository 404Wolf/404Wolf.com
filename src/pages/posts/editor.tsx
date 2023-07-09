import { toTitleCase } from "@/utils/misc";
import Head from "next/head";
import MainLayout from "@/layouts/MainLayout";
import Tile from "@/components/misc/Tile";
import { useState } from "react";
import Markdown from "@/markdown/Markdown";
import useSize from "@/utils/useSize";
import TagsInput from "react-tagsinput";

const Editor = ({}) => {
    const [width, height] = useSize();
    const post = {
        type: useState("Type"),
        id: useState("Id"),
        title: useState("Title"),
        tags: useState<string[]>(["hidden", "featured", "personal", "academic"]),
        cover: useState("Cover"),
        description: useState("Description"),
        markdown: useState("Markdown"),
        resources: useState<{ [key: string]: string }>({}),
    };

    return (
        <>
            <Head>
                <title>Post Editor</title>
            </Head>
            <MainLayout
                title={toTitleCase(post.title[0])}
                editableTitle={true}
                onTitleEdit={post.title[1]}
                header={false}
                containerClasses="lg:-mr-12 sm:-ml-4 lg:-ml-16"
            >
                <div className="absolute -translate-y-12 right-0">
                    <TagsInput
                        value={post.tags[0]}
                        onChange={(tags: string[]) => post.tags[1](tags)}
                        maxTags={8}
                        inputProps={{
                            className: "react-tagsinput-input",
                            placeholder: "Add tag",
                        }}
                    />
                </div>

                <div className="mt-[12px] overflow-visible">
                    <div className="flex mb-4 md:mb-6 gap-4">
                        {/* <Tile
                            containerClass="relative w-1/4"
                            title="Config"
                            direction="left"
                            className="mb-6"
                        >
                            <div className="mt-1">
                                <div>
                                    <TagsInput
                                        value={post.tags[0]}
                                        onChange={(tags: string[]) => post.tags[1](tags)}
                                    />
                                </div>
                            </div>
                        </Tile> */}

                        <Tile
                            containerClass="relative w-3/4"
                            title="Overview"
                            direction="left"
                            className="mb-6"
                        >
                            <textarea className="mt-1 h-fit w-full bg-transparent overflow-auto resize-none focus:outline-none">
                                Description editor will be here.
                            </textarea>
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
                                className="bg-transparent resize-none w-full focus:outline-none"
                                onChange={(e) => post.markdown[1](e.target.value)}
                            >
                                {post.markdown[0]}
                            </textarea>
                        </Tile>

                        <div className="hidden md:contents">
                            <Tile
                                containerClass="relative w-1/2"
                                className="overflow-auto"
                                title="Preview"
                                direction="left"
                            >
                                <div className="-mt-4">
                                    <Markdown markdown={post.markdown[0]} />
                                </div>
                            </Tile>
                        </div>
                    </div>
                </div>
            </MainLayout>
        </>
    );
};

export default Editor;
