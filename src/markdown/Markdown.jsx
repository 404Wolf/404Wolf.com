import ReactMarkdown from "react-markdown";
import remarkImageBlock from "./remark-imageBlock.js";
import ImageBlock from "@/markdown/ImageBlock";
import MdImage from "@/markdown/Image";
import { imgBlockHandler, imgHandler } from "./hast-handlers.js";
import CodeBlock from "@/markdown/CodeBlock";
import remarkToc from "remark-toc";
import remarkSlug from "remark-slug";
import remarkMath from "remark-math";

const Markdown = ({ markdown, resourceMap = {} }) => {
    return (
        <ReactMarkdown
            children={markdown}
            className="markdown"
            remarkPlugins={[
                [remarkSlug],
                [remarkMath, {}],
                [
                    remarkToc,
                    {
                        tight: false,
                        ordered: true,
                        maxDepth: 5,
                        heading: "Contents|Table of Contents",
                    },
                ],
                [remarkImageBlock],
            ]}
            remarkRehypeOptions={{
                handlers: { imgBlock: imgBlockHandler, image: imgHandler },
            }}
            components={{
                img: ({ node, ...props }) => (
                    <MdImage
                        alt={props.alt}
                        title={props.title}
                        src={props.src}
                        width={props.width}
                        float={props.float}
                        label={props.alt}
                        autoplay={props.autoPlay && props.autoPlay == "true"}
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
                code: ({ node, inline, className, children, ...props }) => (
                    <CodeBlock
                        inline={inline}
                        className={className}
                        children={children}
                        {...props}
                    />
                ),
                a: ({ ...props }) => {
                    if (!props.href.includes("#"))
                        return <a {...props} target="_blank" rel="noreferrer noopener" />;
                    return <a {...props} />;
                },
            }}
        />
    );
};

export default Markdown;
