export default function measure(
    text: string,
    fontWeight: string,
    fontSize: number,
    fontName: string,
    fontFamily: string
) {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    if (context) {
        context.font = `${fontWeight} ${fontSize}px '${fontName}', ${fontFamily}`;
        return context.measureText(text).width + 20;
    }
    return 0
}
