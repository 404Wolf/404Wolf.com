import type { Position } from "unist";
import ReactMarkdown from "react-markdown";
import { useState } from "react";
import Image from "next/image";
import remarkImageBlock from "./remark-imageBlock";
import ImageBlock from "@/markdown/ImageBlock";
import MdImage from "@/markdown/Image";
import { imgBlockHandler, imgHandler } from "./hast-handlers";
interface MarkdownProps {
    markdown: string;
    resourceMap?: { [key: string]: string } | undefined;
}

const Markdown = ({ markdown, resourceMap = {} }: MarkdownProps) => {
    return (
        <ReactMarkdown
            children={markdown}
            className="markdown"
            rawSourcePos={true}
            remarkPlugins={[remarkImageBlock]}
            remarkRehypeOptions={{
                handlers: { imgBlock: imgBlockHandler, image: imgHandler },
            }}
            components={{
                img: ({ node, ...props }) => (
                    <MdImage
                        alt={props.alt}
                        title={props.title}
                        src={props.src}
                        resourceMap={resourceMap}
                    />
                ),
                imgBlock: ({ node, ...props }) => (
                    <ImageBlock
                        alts={props.alts}
                        titles={props.titles}
                        srcs={props.srcs}
                        resourceMap={resourceMap}
                    />
                ),
            }}
        />
    );
};

export default Markdown;
