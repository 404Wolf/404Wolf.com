import type { Position } from "unist";
import ReactMarkdown from "react-markdown";
import { useState } from "react";
import Image from "next/image";
import remarkMultiimage from "@/markdown/remark-multiimage";
import rehypeMultiimage from "@/markdown/rehype-multiimage";

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
            transformLinkUri={(uri) => (resourceMap[uri] ? resourceMap[uri] : uri)}
            remarkPlugins={[remarkMultiimage]}
            rehypePlugins={[rehypeMultiimage]}
            components={{
                "imageBlock": (stuff) => {
                    console.log("fueiafiewagufegwyigfawefwafwfwaf")
                    console.log(stuff);
                    return <></>;
                },
            }}
        />
    );
};

export default Markdown;
