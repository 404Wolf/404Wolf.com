import PostData from "./PostData";

interface ExtendedPostCardProps {
    post: PostData;
    tags?: string[];
}

const ExtendedPostCard = ({ post, tags }: ExtendedPostCardProps) => {
    return (
        <div className="relative p-2">
            <div style={{ backgroundImage: `url('${post.cover}')` }}>
                // TODO
            </div>
        </div>
    );
};

export default ExtendedPostCard;
