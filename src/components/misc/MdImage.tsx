import Link from "next/link";
import Tag from "../misc/Tag";
import Image from "next/image";

interface mdImageProps {
    tag?: string;
    alt?: string;
    src: string;
    postType?: string;
    width: string | number;
    float?: "left" | "right" | "none";
    imageClasses?: string;
    styles?: object;
}

const MdImage = ({
    tag,
    alt,
    src,
    float,
    postType,
    width,
    imageClasses,
    styles,
}: mdImageProps) => {
    return (
        <div style={{ ...styles, width }}>
            <Link href={src} target="_blank" rel="noopener noreferrer">
                <div className="inline-block container my-2 duration-100 hover:scale-110">
                    <div className="rounded-2xl border-slate-500 bg-slate-200 border-4 relative">
                        {tag && (
                            <Tag
                                position={
                                    float === "none"
                                        ? null
                                        : float == "left"
                                        ? "br"
                                        : "bl"
                                }
                            >
                                {tag}
                            </Tag>
                        )}
                        <Image
                            src={postType ? `/posts/${postType}/${src}` : src}
                            alt={tag || alt || ""}
                            className={imageClasses}
                            style={{
                                zIndex: -1,
                                objectFit: "cover",
                                objectPosition: "center",
                                width: "100%",
                                height: "100%",
                            }}
                            width={600}
                            height={600}
                        />
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default MdImage;
