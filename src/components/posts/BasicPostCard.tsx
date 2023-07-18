import Link from "next/link";
import Tag from "@/components/misc/Tag";
import { randomListItem, toTitleCase } from "@/utils/misc";
import { useEffect, useState } from "react";
import fetchPostIcon from "./FetchPostIcon";

export interface BasicPostData {
    coverUrls: string[];
    coverAlts: string[];
    path: string;
    type: string;
    tags: string[];
    date: string;
    title: string;
}

interface BasicPostCardProps {
    post?: BasicPostData;
    tags?: string[];
}

const BasicPostCard = ({ post, tags }: BasicPostCardProps) => {
    const [postCoverSrc, setPostCoverSrc] = useState("");
    const tagsToUse = tags || post && post.tags || []

    const potentialLinkWrapper = (children: JSX.Element) =>
        post ? (
            <Link
                href={post.path || ""}
                className={`z-10 ${post.path ? "" : "pointer-events-none"}`}
            >
                {children}
            </Link>
        ) : (
            <></>
        );

    useEffect(() => {
        if (post) {
            const changeImage = () => {
                setPostCoverSrc(randomListItem(post.coverUrls, post.coverAlts)[0]);
            };

            changeImage();
            const changeImageInterval = setInterval(changeImage, 8000);
            return () => clearInterval(changeImageInterval);
        }
    }, []);

    return (
        <div className="relative p-2">
            {potentialLinkWrapper(
                <div
                    className="bg-cover rounded-xl drop-shadow-md hover:brightness-90 ease-in transition-all relative h-[4.6em] md:h-32 lg:h-24 bg-cover bg-center duration-100 hover:scale-105 flex items-center justify-center bg-gray-100/[35%]"
                    style={
                        post
                            ? { backgroundImage: `url('${postCoverSrc}')` }
                            : { backgroundColor: "rgb(90, 90, 90)" }
                    }
                >
                    {post && (
                        <>
                            <div className="absolute -top-[12px] -left-[12px] z-50 scale-[62%]">
                                {fetchPostIcon(post && post.tags || [])}
                            </div>
                            <div
                                className={
                                    post.type &&
                                    "flex gap-[.2rem] absolute bottom-0 -left-2"
                                }
                            >
                                {tagsToUse && <Tag children={toTitleCase(post.type)} />}

                                {tagsToUse.map((tag: string, index: number) => (
                                    <Tag key={index} children={toTitleCase(tag)} />
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
                            {post ? post.title : ""}
                        </h1>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BasicPostCard;
