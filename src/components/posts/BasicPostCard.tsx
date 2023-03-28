import Link from "next/link";
import Tag from "@/components/misc/Tag";
import { toTitleCase } from "@/utils/misc";
import PostData from "./PostData";

interface BasicPostCardProps {
    post?: PostData;
    tags?: string[];
}

const BasicPostCard = ({ post, tags }: BasicPostCardProps) => {
    return (
        <div className="relative p-2">
            <Link
                href={post?.path || ""}
                className={`z-10 ${post ? "" : "pointer-events-none"}`}
            >
                <div
                    className="bg-cover rounded-xl drop-shadow-md hover:brightness-90 ease-in transition-all relative h-[4.6em] md:h-32 lg:h-24 bg-cover bg-center duration-100 hover:scale-105 flex items-center justify-center bg-gray-100/[35%]"
                    style={{ backgroundImage: `url('${post?.cover}')` }}
                >
                    {post && (
                        <div
                            className={
                                post.type && "flex gap-1 absolute bottom-0 right-0"
                            }
                        >
                            {post.type && (
                                <Tag
                                    children={toTitleCase(post.type)}
                                    absolute={!post.type}
                                />
                            )}
                            <Tag children={post.date} absolute={!post.type} />
                            {tags &&
                                tags.map((tag, index) => (
                                    <Tag
                                        key={index}
                                        children={toTitleCase(tag)}
                                        absolute={!post.type}
                                    />
                                ))}
                        </div>
                    )}

                    <div className="flex flex-col">
                        <h1
                            className="text-center text-[12.5px] sm:text-lg text-white font-bold sm:font-extrabold"
                            style={{ textShadow: "0 0 22px rgba(0, 0, 0, .85)" }}
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
