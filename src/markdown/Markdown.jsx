import ReactMarkdown from "react-markdown";
import remarkImageBlock from "./remark-imageBlock.js";
import ImageBlock from "@/markdown/ImageBlock";
import MdImage from "@/markdown/Image";
import { imgBlockHandler, imgHandler } from "./hast-handlers.js";
import CodeBlock from "@/markdown/CodeBlock";

const Markdown = ({ markdown, resourceMap = {} }) => {
    console.log(markdown)
    return (
        <ReactMarkdown
            children={markdown}
            className="markdown"
            remarkPlugins={[remarkImageBlock]}
            remarkRehypeOptions={{
                handlers: { imgBlock: imgBlockHandler, image: imgHandler },
            }}
            components={{
                img: ({ node, ...props }) => {console.log(props); return (
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
                )},
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
                a: ({ ...props }) => <a {...props} target="_blank" rel="noreferrer noopener" />,
            }}
        />
    );
};

export default Markdown;
