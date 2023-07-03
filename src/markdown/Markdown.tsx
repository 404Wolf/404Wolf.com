import type { Position } from "unist";
import ReactMarkdown from "react-markdown";
import { useState } from "react";
import Image from "next/image";

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
            components={{
                img: ({ alt, src, title, sourcePosition }) => (
                    <Image
                        alt={alt as string}
                        src={src.includes("%7C") ? resourceMap[src.split("%7C")[0]]: resourceMap[src]}
                        title={title}
                        width={300}
                        height={300}
                    />
                ),
            }}
        />
    );
};

export default Markdown;
