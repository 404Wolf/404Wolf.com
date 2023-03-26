import PostCard from "@/components/posts/PostCard";
import postData from "@/components/posts/PostData";

interface PostCardGridProps {
    posts: (postData | null)[];
    featuredOnly?: boolean;
    postTags?: boolean;
    minAmount?: number;
}

const PostCardGrid = ( { posts, minAmount, featuredOnly, postTags }: PostCardGridProps ) => {
    if (featuredOnly) {
        posts = posts.filter(post => (post === null) ? false : post.featured)
    }

    if (minAmount) {
        // Fill projects up with dummy projects to make the grid look nice
        // We want a minimum of 20 projects
        while (posts.length < minAmount) {
            posts.push(null)
        }
    }

    return (
        <div className="pt-3 sm:pt-2 grid grid-cols-2 sm:grid-cols-1 justify-between items-center gap-1 sm:gap-2">
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
                                page={ "/projects/"+ post.id }
                                date={ post.date }
                                type={ post.type }
                                key={ index }
                                tags={ postTags }
                            />
                        )
                    }
                }
            )}
        </div>
    );
}
 
export default PostCardGrid;
