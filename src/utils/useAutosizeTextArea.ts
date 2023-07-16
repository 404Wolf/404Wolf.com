import { DependencyList, useEffect } from "react";

// Updates the height of a <textarea> when the value changes.
const useAutosizeTextArea = (
    textAreaRef: HTMLTextAreaElement | null,
    dependencies: DependencyList = [],
    minHeight: number = 0
) => {
    // Define function that performs the resizing
    const resize = () => {
        if (textAreaRef) {
            // We need to reset the height momentarily to get the correct scrollHeight for the textarea
            textAreaRef.style.height = "0px";
            const scrollHeight = textAreaRef.scrollHeight;

            // We then set the height directly, outside of the render loop
            // Trying to set this with state or a ref will product an incorrect value.
            const autoHeight = scrollHeight + 5 < minHeight ? minHeight : scrollHeight + 5;
            textAreaRef.style.height = autoHeight + "px";
        }
    };

    // Resize text area on text area content update
    useEffect(resize, [textAreaRef, ...dependencies]);

    // Resize text area on window resize
    useEffect(() => {
        addEventListener("resize", resize);
        return () => removeEventListener("resize", resize);
    }, []);

    return resize;
};

export default useAutosizeTextArea;
