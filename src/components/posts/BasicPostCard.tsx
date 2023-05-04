import Link from "next/link";
import Tag from "@/components/misc/Tag";
import { randomListItem, toTitleCase } from "@/utils/misc";
import PostData from "./PostData";
import { useEffect, useState } from "react";
import fetchPostIcon from "./fetchPostIcon";

interface BasicPostCardProps {
    post?: PostData;
    tags?: string[];
}

const BasicPostCard = ({ post, tags }: BasicPostCardProps) => {
    const [postCover, setPostCover] = useState("");

    useEffect(() => {
        const changeImage = () => {
            if (post?.covers) {
                setPostCover(randomListItem(post.covers));
            }
        };

        changeImage();
        const changeImageInterval = setInterval(changeImage, 8000);
        return () => clearInterval(changeImageInterval);
    }, [post]);

    return (
        <div className="relative p-2">
            <Link
                href={post?.path || ""}
                className={`z-10 ${post ? "" : "pointer-events-none"}`}
            >
                <div
                    className="bg-cover rounded-xl drop-shadow-md hover:brightness-90 ease-in transition-all relative h-[4.6em] md:h-32 lg:h-24 bg-cover bg-center duration-100 hover:scale-105 flex items-center justify-center bg-gray-100/[35%]"
                    style={{ backgroundImage: `url('${postCover}')` }}
                >
                    {post && (
                        <>
                            <div className="absolute -top-[12px] -left-[12px] z-50 scale-[62%]">
                                {fetchPostIcon(post)}
                            </div>
                            <div
                                className={
                                    post.type &&
                                    "flex gap-[.2rem] absolute bottom-0 -left-2"
                                }
                            >
                                {post.type && (
                                    <Tag
                                        children={toTitleCase(post.type)}
                                        absolute={!post.type}
                                    />
                                )}

                                {tags &&
                                    tags.map((tag, index) => (
                                        <Tag
                                            key={index}
                                            children={toTitleCase(tag)}
                                            absolute={!post.type}
                                        />
                                    ))}
                            </div>
                            <Tag children={post.date} position={"tr"} />
                        </>
                    )}

                    <div className="flex flex-col">
                        <h1
                            className="text-center text-[12.5px] sm:text-lg text-white font-bold sm:font-extrabold"
                            style={{ textShadow: "0 0 14px rgba(0, 0, 0, 1)" }}
                        >
                            {post?.name}
                        </h1>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default BasicPostCard;
