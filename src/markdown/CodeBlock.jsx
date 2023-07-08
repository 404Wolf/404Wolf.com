import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { useState, useEffect, ReactNode} from "react";
import codeblockStyle from "./codeblock-style";

const CodeBlock = ({ inline, className, children, ...props }) => {
    const defaultReturn = (
        <code {...props} className={className}>
            {children}
        </code>
    );
    if (inline) return defaultReturn;

    const match = /language-(\w+)/.exec(className || "");
    if (!match) return defaultReturn;

    return (
        <div className="codeblock">
            <SyntaxHighlighter
                {...props}
                children={String(children).replace(/\n$/, "")}
                style={codeblockStyle}
                language={match[1]}
                showLineNumbers={true}
                PreTag="div"
            />
        </div>
    );
};

export default CodeBlock;
