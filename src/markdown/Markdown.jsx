import ReactMarkdown from "react-markdown";
import remarkImageBlock from "./remark-imageBlock.js";
import ImageBlock from "@/markdown/ImageBlock";
import MdImage from "@/markdown/Image";
import { imgBlockHandler, imgHandler } from "./hast-handlers.js";
import CodeBlock from "@/markdown/CodeBlock";
import remarkSlug from "remark-slug";
import remarkMath from "remark-math";
import rehypeToc from "rehype-toc"

const Markdown = ({ markdown, addContents = false, resourceMap = {} }) => {
  return (
    <ReactMarkdown
      children={markdown}
      className="markdown"
      remarkPlugins={[
        [remarkSlug],
        [remarkMath, {}],
        [remarkImageBlock],
      ]}
      rehypePlugins={[
        addContents &&
        [
          rehypeToc,
          {
            customizeTOC: (ast) => {
              return {
                type: 'element',
                tagName: 'div',
                properties: { className: 'markdown toc-container' },
                children: [
                  // Heading 
                  {
                    type: 'element',
                    tagName: 'h1',
                    properties: { className: 'markdown toc-heading' },
                    children: [{ type: 'text', value: 'Contents' }]
                  },
                  // Original AST
                  { ...ast },
                  // Heading 
                  {
                    type: 'element',
                    tagName: 'hr',
                    properties: { className: 'markdown' },
                    children: []
                  },
                ]
              }
            }
          }
        ]
      ].filter(Boolean)}
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
