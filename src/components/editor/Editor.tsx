import { useEffect, useRef, useState } from "react";

interface EditorAreaProps {
    objectName: string;
    currentText: string;
    setCurrentText: (text: string) => void;
}

const EditorArea = ({ objectName, currentText, setCurrentText }: EditorAreaProps) => {
    const editorArea = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setTimeout(() => {
            if (editorArea.current) editorArea.current.innerText = currentText;
        }, 0);
    }, [currentText]);

    return (
        <div
            ref={editorArea}
            onInput={(e) => setCurrentText((e.target as HTMLDivElement).innerText)}
            contentEditable={true}
            suppressContentEditableWarning={true}
            className="markdown w-full h-full bg-transparent rounded-lg focus:outline-none"
        />
    );
};

export default EditorArea;
