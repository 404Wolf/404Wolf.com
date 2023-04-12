import ReactDOMServer from "react-dom/server";
import MdImage from "@/components/misc/MdImage";

export function parseMd(
    projectMd: string,
    screenWidth: number,
    postId?: string | undefined,
    postType?: string | undefined
): string {
    const imageReplacer = (
        match: string,
        alt: string,
        filename: string,
        width: string,
        float: "left" | "right" | "none",
        clear: "left" | "right" | "both" | "none"
    ) => {
        let idealWidth;
        if (screenWidth < 640) {
            idealWidth = width ? (1.7 * Number(width)) % 100 : 53;
        } else if (screenWidth < 768) {
            idealWidth = width ? (1.2 * Number(width)) % 100 : 40;
        } else if (screenWidth < 1024) {
            idealWidth = width ? 0.8 * Number(width) : 45;
        } else if (screenWidth < 1280) {
            idealWidth = width ? 0.8 * Number(width) : 40;
        } else if (screenWidth < 1536) {
            idealWidth = width ? 0.8 * Number(width) : 40;
        } else {
            idealWidth = width || 35;
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
                float={float || "right"}
                postType={postType}
            />
        );
        return ReactDOMServer.renderToString(replaced);
    };

    const imageGroupReplacer = (match: string) => {
        const makeMdImage = (alt: string, filename: string) => (key: number) =>
            (
                <MdImage
                    alt={alt}
                    src={postId ? `${postId}/resources/${filename}` : filename}
                    width="100%"
                    float="none"
                    postType={postType}
                    key={key}
                />
            );

        // Create array of MdImages from match
        const images = match
            .split("!")
            .filter((image) => image !== "")
            .map((image) => {
                const [alt, filename] = image
                    .replace(/\[(.*)\]\((.*)\)/, "$1;$2")
                    .split(";");
                return makeMdImage(alt, filename);
            });

        return ReactDOMServer.renderToString(
            <div className="md:px-[10%] flex gap-2 md:gap-6 flex-row justify-center items-center">
                {images.map((image, index) => image(index))}
            </div>
        );
    };

    projectMd = projectMd.replace(/#\s*(.*)/, "<h1 class='!mt-[-.5em]'>$1</h1>");
    projectMd = projectMd.replaceAll(
        /!\[[^\]]+\]\([^\)]+\)(\s*!\[[^\]]+\]\([^\)]+\))+/g,
        imageGroupReplacer
    );
    projectMd = projectMd.replaceAll(
        /!\[(.*)\]\((.*\.[a-z]+)\|?(?:width=(\d+))?\|?(?:float=([a-z]+))?\)??\|?(?:clear=([a-z]+))?\)?/g,
        imageReplacer
    );
    return projectMd;
}
