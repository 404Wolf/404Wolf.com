import { randomListItem } from "@/utils/misc";
import PostData from "./PostData";
import Image from "next/image";

interface ExtendedPostCardProps {
    post: PostData;
    tags?: string[];
}

const ExtendedPostCard = ({ post, tags }: ExtendedPostCardProps) => {
    return (
        <div className="p-2 flex gap-3 bg-slate-400 rounded-2xl">
            <div className="basis-1/4 relative">
                <Image src={randomListItem(post.covers)} className="rounded-2xl" alt={post.name} fill />
            </div>
            <p className="basis-3/4">{post.description}</p>
        </div>
    );
};

export default ExtendedPostCard;
