import ReactDOMServer from "react-dom/server";
import MdImage from "@/components/misc/MdImage";

export function parseMd(
    projectMd: string,
    screenWidth: number,
    postId?: string | undefined,
    postType?: string | undefined
): string {
    const replacer = (
        match: string,
        alt: string,
        filename: string,
        width: string,
        float: "left" | "right" | "none",
        clear: "left" | "right" | "both" | "none"
    ) => {
        let idealWidth;

        if (screenWidth < 460) {
            idealWidth = width ? Number(width) + 37 : 52;
            float = "right";
            clear = "both";
        } else if (screenWidth < 1000) {
            idealWidth = width ? Number(width) + 20 : 30;
        } else {
            idealWidth = width ? Number(width) + 9 : 21;
        }
        idealWidth = Math.min(idealWidth, 100);

        if (!float) {
            float = "right";
        }

        let styles;
        if (float == "none") {
            styles = {
                marginLeft: "auto",
                marginRight: "auto",
            };
        } else {
            styles = {
                float: float,
                clear: clear ? clear : "",
                marginLeft: float == "right" ? "1rem" : "",
                marginRight: float == "left" ? "1rem" : "",
            };
        }

        const replaced = (
            <MdImage
                src={postId ? `${postId}/resources/${filename}` : filename}
                styles={styles}
                width={`${idealWidth}%`}
                tag={alt}
                float={float}
                postType={postType}
            />
        );
        return ReactDOMServer.renderToString(replaced);
    };

    projectMd = projectMd.replace(/#\s*(.*)/, "<h1 class='!mt-[-.5em]'>$1</h1>");
    projectMd = projectMd.replaceAll(
        /!\[(.*)\]\((.*\.[a-z]+)\|?(?:width=(\d+))?\|?(?:float=([a-z]+))?\)??\|?(?:clear=([a-z]+))?\)?/g,
        replacer
    );
    return projectMd;
}
