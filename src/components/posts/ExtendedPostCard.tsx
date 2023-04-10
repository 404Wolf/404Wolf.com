import { randomListItem } from "@/utils/misc";
import PostData from "./PostData";
import Image from "next/image";
import Tag from "../misc/Tag";
import Link from "next/link";
import { IoMdSchool } from "react-icons/io";
import { IoPersonSharp } from "react-icons/io5";
import { BsQuestionLg } from "react-icons/bs";

const nullDescription = "Description coming soon!";

interface ExtendedPostCardProps {
    post: PostData | null;
    tags?: string[];
}

const ExtendedPostCard = ({ post, tags }: ExtendedPostCardProps) => {
    if (!post) return <div className="h-40 bg-slate-400 rounded-xl"></div>;

    const postDescription = post.description ? post.description : nullDescription;

    const postIconClass = "rounded-full bg-slate-600 p-2 w-9 h-9";
    const postIconStyle = {filter: "invert(100%)", width: "100%", height: "100%"};
    let postIcon;
    if (post.tags.includes("academic")) {
        postIcon = <IoMdSchool style={postIconStyle} />;
    } else if (post.tags.includes("personal")) {
        postIcon = (
            <IoPersonSharp style={postIconStyle} />
        );
    } else {
        postIcon = <BsQuestionLg style={postIconStyle} />;
    }
    postIcon = <div className={postIconClass}>{postIcon}</div>;

    return (
        <Link href={post.path}>
            <div className="h-[9.8rem] w-full relative container drop-shadow-md hover:drop-shadow-lg hover:scale-[102%] duration-200">
                <Image
                    fill
                    alt={`${post.name} cover image`}
                    src={post.covers[0]}
                    className="object-cover rounded-xl z-0"
                />

                <div className="absolute z-50 -top-2 -right-2">{postIcon}</div>

                <h1 className="z-50 px-2 py-px text-white text-[15px] absolute -top-2 -left-2 bg-slate-600 rounded-full">
                    {post.name}
                </h1>

                <div className="flex gap-x-[4px] absolute -bottom-1 -left-2">
                    {tags?.map((tag, index) => (
                        <Tag
                            key={index}
                            children={tag}
                            absolute={false}
                            background="#475569"
                        />
                    ))}
                </div>

                <h1 className="z-50 px-2 py-px text-white text-lg absolute -bottom-2 -right-2 bg-slate-600 rounded-full">
                    {post.date}
                </h1>

                <div className="absolute left-1/2 z-30 -translate-x-1/2 w-5/6 drop-shadow-xl-c scale-90">
                    <p className="indent-4 bg-gray-200 rounded-2xl overflow-hidden h-[91px] p-2 translate-y-9 text-[10px]">
                        {postDescription}
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default ExtendedPostCard;
