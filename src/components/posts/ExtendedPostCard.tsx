import { randomListItem } from "@/utils/misc";
import PostData from "./PostData";
import Image from "next/image";
import Tag from "../misc/Tag";
import Link from "next/link";
import { IoMdSchool } from "react-icons/io";
import { IoPersonSharp } from "react-icons/io5";
import { BsQuestionLg } from "react-icons/bs";

const nullDescription = "Description coming soon!";
const tagColor = "#6f7e96";

interface ExtendedPostCardProps {
    post: PostData;
    tags?: string[];
}

const ExtendedPostCard = ({ post, tags }: ExtendedPostCardProps) => {
    const postDescription = post.description ? post.description : nullDescription;

    const postIconClass =
        "rounded-full bg-slate-200 p-1 w-8 h-8 border-2 border-slate-400";
    let postIcon;
    if (post.tags.includes("academic")) {
        postIcon = <IoMdSchool className={postIconClass} />;
    } else if (post.tags.includes("personal")) {
        postIcon = <IoPersonSharp className={postIconClass} />;
    } else {
        postIcon = <BsQuestionLg className={postIconClass} />;
    }

    return (
        <Link href={post.path}>
            <div className="relative container">
                <div className="border-slate-400 border-2 rounded-xl duration-100 hover:drop-shadow-md relative">
                    <div
                        style={{ backgroundColor: tagColor }}
                        className="text-white bottom-0 right-0 translate-y-1 translate-x-1 absolute z-50 rounded-full py-0 px-1 text-[14px]"
                    >
                        {post.date}
                    </div>

                    <div className="absolute -top-4 -left-4 z-50 p-2">{postIcon}</div>

                    <div className="z-50 flex flex-row gap-x-1 h-4 absolute right-0 top-0 -translate-y-3">
                        {tags?.map((tag) => (
                            <Tag key={tag} background={tagColor} absolute={false}>
                                {tag}
                            </Tag>
                        ))}
                    </div>

                    <div
                        className="rounded-xl bg-top bg-cover"
                        style={{ backgroundImage: `url('${post.covers[0]}')` }}
                    >
                        <div className="backdrop-blur-[1.5px] rounded-xl container relative p-2 py-4 relative container">
                            <h2
                                className="text-white font-bold mx-auto text-center"
                                style={{ textShadow: "0 0 8px rgba(0, 0, 40, .8)" }}
                            >
                                {post.name}
                            </h2>

                            <div className="rounded-bl-xl rounded-br-xl -m-2 -mb-4 -mt-1 p-4">
                                <p className="text-xs h-12 overflow-y-hidden bg-slate-200 -mx-4 -mb-4 rounded-bl-xl rounded-br-xl p-2 border-t-2 border-slate-400">
                                    {postDescription}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ExtendedPostCard;
