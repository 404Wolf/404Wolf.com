"use client";
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

const CodeBlock = ({ inline, className, children, ...props }) => {
  const defaultReturn = (
    <code {...props} className={`${className} inline-markdown-codeblock`}>
      {children}
    </code>
  );
  if (inline) return defaultReturn;

  const match = /language-(\w+)/.exec(className || "");
  if (!match) return defaultReturn;

  return (
    <div className={"rounded"} class="markdown-codeblock">
      <SyntaxHighlighter
        {...props}
        children={String(children).replace(/\n$/, "")}
        style={oneLight}
        customStyle={{
          fontSize: "12px"
        }}
        codeTagProps={{
          style: {
            lineHeight: "inherit",
            fontSize: "inherit"
          }
        }}
        language={match[1]}
        showLineNumbers={true}
        PreTag="div"
        codeblock
      />
    </div>
  );
};

export default CodeBlock;
