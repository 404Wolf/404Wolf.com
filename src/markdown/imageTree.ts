const imageWidthTree = (width: number, imageId: string): string => {
    const genBreakpoint = (minWidth: number, width: number, label: string) => `
/* ${label} */
@media (min-width: ${minWidth}px) {
    #${imageId} {
        width: ${width}%;
    }
}`;

    return (
        `/* Default width */\n#${imageId} {\n    width: ${width}%\n}` +
        genBreakpoint(640, width, "Tailwind sm breakpoint") +
        genBreakpoint(768, width, "Tailwind mg breakpoint") +
        genBreakpoint(1024, width, "Tailwind lg breakpoint") +
        genBreakpoint(1280, width, "Tailwind xl breakpoint") +
        genBreakpoint(1536, width, "Tailwind 2xl breakpoint")
    );
};

export default imageWidthTree;
