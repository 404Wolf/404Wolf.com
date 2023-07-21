import NextImage from "next/image";
import imageWidthTree from "@/markdown/imageTree";
import Tag from "@/components/misc/Tag";
import { createHash } from "crypto";
import { useEffect, useState } from "react";
import Modal from "@/components/misc/Modal";

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
    imgClasses?: string;
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
    imgClasses = "",
}: ImageProps) => {
    let [imageStyleId, setImageStyleId] = useState("");
    let [imageStyleWidthTree, setImageStyleWidthTree] = useState<null | string>(null);
    const [margin, setMargin] = useState({ marginLeft: "0px", marginRight: "0px" });
    const [tagPos, setTagPos] = useState("");
    const [enlarged, setEnlarged] = useState(false);
    const requestedWidth = width ? parseInt(width) : 36;

    useEffect(() => {
        if (stylize) {
            console.log(float);
            const generatedImageStyleId =
                "_a" +
                createHash("sha256")
                    .update(src + title + alt + float + label + width)
                    .digest("hex");
            setImageStyleId(generatedImageStyleId);
            setImageStyleWidthTree(imageWidthTree(requestedWidth, generatedImageStyleId));

            switch (float) {
                case "left":
                    setMargin({ marginRight: "10px", marginLeft: "0px" });
                    setTagPos("br");
                    return;
                case "right":
                    setMargin({ marginRight: "0px", marginLeft: "10px" });
                    setTagPos("br");
                    return;
            }
        }
    }, []);

    const imageElement = (classes?: string) => (
        <NextImage
            alt={alt}
            src={resourceMap[src]}
            title={title}
            width={nextImgSize[0]}
            height={nextImgSize[1]}
            className={(classes || "") + imgClasses + " w-full h-full"}
        />
    );

    return (
        <div className="hover:drop-shadow-2xl">
            <Modal
                className="rounded-2xl drop-shadow-5xl-c fixed p-7"
                open={enlarged}
                onClose={() => setEnlarged(false)}
                setOpen={() => setEnlarged(false)}
            >
                <div className="p-0 relative">
                    {label && <Tag position={tagPos}>{label}</Tag>}
                    {imageElement("rounded-xl border-slate-300 border-[2px] h-[90vh] w-auto")}
                </div>
            </Modal>

            {stylize && <style>{imageStyleWidthTree}</style>}
            <div
                id={imageStyleId}
                className="relative cursor-pointer"
                style={margin && { float: float as "right" | "left" | "none", ...margin }}
            >
                {label && !enlarged && <Tag position={tagPos}>{label}</Tag>}
                <a onClick={() => setEnlarged(true)}>{imageElement(enlarged ? "blur" : "")}</a>
            </div>
        </div>
    );
};

export default Image;
