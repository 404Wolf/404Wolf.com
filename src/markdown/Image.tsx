import NextImage from "next/image";
import imageWidthTree from "@/markdown/imageTree";
import Tag from "@/components/misc/Tag";
import { createHash } from "crypto";
import { useEffect, useState } from "react";

interface ImageProps {
    alt: string;
    src: string;
    title: string;
    stylize?: boolean;
    width?: string;
    float?: string;
    label?: string;
    nextImgSize?: [number, number];
    resourceMap?: { [key: string]: string };
}

const Image = ({
    alt,
    src,
    title,
    stylize = true,
    width,
    float = "right",
    label,
    nextImgSize = [500, 500],
    resourceMap = {},
}: ImageProps) => {
    let [imageStyleId, setImageStyleId] = useState("");
    let [imageStyleWidthTree, setImageStyleWidthTree] = useState<null | string>(null);
    const [margin, setMargin] = useState({ marginLeft: "0px", marginRight: "0px" });
    const [tagPos, setTagPos] = useState("");
    const requestedWidth = width ? parseInt(width) : 36;

    useEffect(() => {
        if (stylize) {
            const generatedImageStyleId =
                "_a" +
                createHash("sha256")
                    .update(src + title + alt + float + label + width)
                    .digest("hex");
            setImageStyleId(generatedImageStyleId);
            setImageStyleWidthTree(imageWidthTree(requestedWidth, generatedImageStyleId));

            switch (float) {
                case "left":
                    setMargin({ marginRight: "0px", marginLeft: "12px" });
                    setTagPos("br");
                case "right":
                    setMargin({ marginRight: "12px", marginLeft: "0px" });
                    setTagPos("br");
            }
        }
    }, []);

    return (
        <>
            {stylize && <style>{imageStyleWidthTree}</style>}
            <div
                id={imageStyleId}
                className="relative"
                style={margin && { float: float as "right" | "left" | "none", ...margin }}
            >
                {label && <Tag position={tagPos}>{label}</Tag>}
                <NextImage
                    alt={alt}
                    src={resourceMap[src]}
                    title={title}
                    width={nextImgSize[0]}
                    height={nextImgSize[1]}
                />
            </div>
        </>
    );
};

export default Image;
