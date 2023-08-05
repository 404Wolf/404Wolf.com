export default function measure(
    text: string,
    fontWeight: string,
    fontSize: number,
    fontName: string,
    fontFamily: string,
    screenWidth: number
) {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const offset = 66;

    let modifier = 1;
    if (screenWidth !== 0) {
        if (screenWidth < 470) modifier = 0.71;
        else if (screenWidth < 600) modifier = 0.85;
        else if (screenWidth < 750) modifier = 0.895;
        else if (screenWidth < 1200) modifier = 0.95;
    }

    if (context) {
        context.font = `${fontWeight} ${fontSize}px '${fontName}', ${fontFamily}`;
        return (context.measureText(text).width + offset) * modifier;
    }
    return 0;
}
