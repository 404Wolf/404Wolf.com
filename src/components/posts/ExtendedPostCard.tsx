import { randomListItem } from "@/utils/misc";
import PostData from "./PostData";
import Image from "next/image";
import Tag from "../misc/Tag";
import Link from "next/link";

const nullDescription = "Description coming soon!";
const tagColor = "rgb(81, 95, 115)";

interface ExtendedPostCardProps {
    post: PostData;
    tags?: string[];
}

const ExtendedPostCard = ({ post, tags }: ExtendedPostCardProps) => {
    const postDescription = post.description ? post.description : nullDescription;

    return (
        <Link href={post.path}>
            <div className="px-2 py-4 bg-slate-400/50 rounded-2xl container relative duration-100 hover:drop-shadow-xl hover:brightness-90 min-h-full">
                <h1 className="text-white bg-slate-700 absolute mx-auto top-0 left-0 z-50 rounded-full -translate-y-3 md:-translate-y-5 -translate-x-2 px-[6px] text-sm md:text-lg">
                    {post.name}
                </h1>

                {tags && (
                    <div className="flex gap-1 absolute bottom-0 right-0">
                        {tags.map((tag) => (
                            <Tag background={tagColor} absolute={false}>
                                {tag}
                            </Tag>
                        ))}
                    </div>
                )}

                <Tag position="bl" background={tagColor}>
                    {post.date}
                </Tag>

                <div className="relative container w-24 md:w-32 h-24 md:h-32 float-left mr-3 mb-3">
                    <Image
                        src={randomListItem(post.covers)}
                        className="overflow-trim  rounded-2xl"
                        alt={post.name}
                        placeholder="blur"
                        blurDataURL="/resources/white_dot.png"
                        fill
                    />
                </div>
                <p className="text-xs cursor-text">{postDescription}</p>
            </div>
        </Link>
    );
};

export default ExtendedPostCard;
