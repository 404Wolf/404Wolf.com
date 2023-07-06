import ReactMarkdown from "react-markdown";
import remarkImageBlock from "./remark-imageBlock";
import ImageBlock from "@/markdown/ImageBlock";
import MdImage from "@/markdown/Image";
import { imgBlockHandler, imgHandler } from "./hast-handlers";
import CodeBlock from "./CodeBlock";

const Markdown = ({ markdown, resourceMap = {} }) => {
    return (
        <ReactMarkdown
            children={markdown}
            className="markdown"
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
                code: ({ node, inline, className, children, ...props }) => (
                    <CodeBlock
                        inline={inline}
                        className={className}
                        children={children}
                        {...props}
                    />
                ),
            }}
        />
    );
};

export default Markdown;
