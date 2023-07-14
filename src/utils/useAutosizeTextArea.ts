import { DependencyList, useEffect } from "react";

// Updates the height of a <textarea> when the value changes.
const useAutosizeTextArea = (
    textAreaRef: HTMLTextAreaElement | null,
    dependencies: DependencyList = []
) => {
    // Define function that performs the resizing
    const resize = () => {
        if (textAreaRef) {
            // We need to reset the height momentarily to get the correct scrollHeight for the textarea
            textAreaRef.style.height = "0px";
            const scrollHeight = textAreaRef.scrollHeight;

            // We then set the height directly, outside of the render loop
            // Trying to set this with state or a ref will product an incorrect value.
            textAreaRef.style.height = scrollHeight + 5 + "px";
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
