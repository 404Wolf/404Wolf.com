const imageWidthTree = (width: number, imageId: string): string => {
	const genBreakpoint = (minWidth: number, width: number, label: string) => `
/* ${label} */
@media (min-width: ${minWidth}px) {
    #${imageId} {
        width: ${width}%;
    }
}`;

	return (
		`/* Default width */\n#${imageId} {\n    width: ${Math.min(
			width + 22,
			100,
		)}%\n}` +
		genBreakpoint(440, Math.min(width + 5, 100), "Tailwind sm breakpoint") +
		genBreakpoint(768, Math.min(width + 2, 100), "Tailwind mg breakpoint") +
		genBreakpoint(1024, Math.min(width - 5, width), "Tailwind lg breakpoint") +
		genBreakpoint(1280, Math.min(width - 6, width), "Tailwind xl breakpoint") +
		genBreakpoint(1536, Math.min(width - 8, width), "Tailwind 2xl breakpoint")
	);
};

export default imageWidthTree;
