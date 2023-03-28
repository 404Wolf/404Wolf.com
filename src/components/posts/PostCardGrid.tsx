import PostCard from "@/components/posts/PostCard";
import postData from "@/components/posts/PostData";

interface PostCardGridProps {
    posts: (postData | null)[];
    onlyFeatured?: boolean;
    tags?: string[];
    minAmount?: number;
    gridConfig?: string;
    showTags?: string[];
}

const PostCardGrid = ( { posts, minAmount, onlyFeatured, showTags, tags=[], gridConfig="grid grid-cols-2" }: PostCardGridProps ) => {
    if (onlyFeatured) {
        posts = posts.filter(post => post && post.tags.includes("featured"))
    }

    if (minAmount) {
        // Fill projects up with dummy projects to make the grid look nice
        // We want a minimum of 20 projects
        while (posts.length < minAmount) {
            posts.push(null)
        }
    }

    return (
        <div className={`pt-3 sm:pt-2 grid ${gridConfig} justify-between items-center gap-1 sm:gap-2`}>
            {posts.map(
                (post, index) => {
                    if (post === null) {
                        return (
                            <PostCard isDummy={ true } key={ index} /> 
                        )
                    }
                    else {
                        return (
                            <PostCard 
                                id={ post.id }
                                name={ post.name }
                                cover={ post.cover }
                                page={ `/posts/${post.type}/${post.id}` }
                                date={ post.date }
                                type={ post.type }
                                key={ index }
                                tags={
                                    [...post.tags.filter(tag => showTags?.includes(tag)), ...tags]
                                }
                            />
                        )
                    }
                }
            )}
        </div>
    );
}
 
export default PostCardGrid;
