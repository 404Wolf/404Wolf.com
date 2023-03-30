import ReactDOMServer from "react-dom/server"
import MdImage from "@/components/misc/MdImage"

export function parseMd (projectMd: string, projectId: string, screenWidth: number): string {
    const replacer = (
        match: string, 
        alt: string, 
        filename: string, 
        width: string, 
        height: string, 
        float: "left" | "right" | "none", 
        clear: "left" | "right" | "both" | "none"
    ) => {
        let idealWidth

        if (!height) {
            if (screenWidth < 460) {
                idealWidth = width ? Number(width) + 37 : 52
                float = "right"
                clear = "both"
            }
            else if (screenWidth < 1000) {
                idealWidth = width ? (Number(width) + 20) : 30
            }
            else {
                idealWidth = width ? (Number(width) + 9) : 21
            }
            idealWidth = Math.min(idealWidth, 100)
        }

        if (!float) {
            float = "right"
        }

        const styles = {
            float: float ? `${float}` : 'right',
            width: `${idealWidth}%`,
            height: height ? `${height}px` : "",
            marginRight: float == "left" ? "1rem" : "",
            marginLeft: float == "right" ? "1rem" : "",
            clear: clear ? clear : "",
        }

        const replaced = (
            <MdImage 
                src={ `${projectId}/resources/${filename}` } 
                styles={ styles }
                tag={ alt }
                float={ float }
            />
        )
        return ReactDOMServer.renderToString(replaced)
    }

    projectMd = projectMd.replace(/#\s*(.*)/, "<h1 class='!mt-[-.5em]'>$1</h1>")
    projectMd = projectMd.replaceAll(/!\[(.*)\]\((.*\.[a-z]+)\|?(?:width=(\d+))?\|?(?:height=(\d+))?\|?(?:float=([a-z]+))?\)??\|?(?:clear=([a-z]+))?\)?/g, replacer);
    return projectMd
}
