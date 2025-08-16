import { type DependencyList, useEffect, useRef } from "react";

// Updates the height of a <textarea> when the value changes.
const useAutosizeTextArea = (
	textAreaRef: HTMLTextAreaElement | null,
	_dependencies: DependencyList = [],
	minHeight: number = 0,
	auto: boolean = true,
) => {
	// Define a ref to store the previous scroll position
	const scrollPositionRef = useRef(0);

	// Define function that performs the resizing
	const resize = () => {
		if (textAreaRef) {
			// Store the current scroll position before resizing
			scrollPositionRef.current = textAreaRef.scrollTop;

			// We need to reset the height momentarily to get the correct scrollHeight for the textarea
			textAreaRef.style.height = "0px";
			const scrollHeight = textAreaRef.scrollHeight;

			// We then set the height directly, outside of the render loop
			// Trying to set this with state or a ref will produce an incorrect value.
			const autoHeight =
				scrollHeight + 5 < minHeight ? minHeight : scrollHeight + 5;
			textAreaRef.style.height = `${autoHeight}px`;

			// Restore the scroll position after resizing
			textAreaRef.scrollTop = scrollPositionRef.current;
		}
	};

	// Resize text area on text area content update
	useEffect(() => {
		if (auto) resize();
	}, [auto, resize]);

	// Resize text area on window resize
	useEffect(() => {
		if (!auto) return;
		addEventListener("resize", resize);
		addEventListener("deviceorientation", resize);

		// Clean up event listeners when the component unmounts
		return () => {
			removeEventListener("resize", resize);
			removeEventListener("deviceorientation", resize);
		};
	}, [auto, resize]);

	return resize;
};

export default useAutosizeTextArea;
