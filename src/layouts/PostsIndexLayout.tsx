import MainLayout from "@/layouts/MainLayout";
import Tile from "@/components/misc/Tile";
import PostData from "@/components/posts/PostData";
import { useEffect, useState } from "react";
import ExtendedPostCard from "@/components/posts/ExtendedPostCard";


interface PostsProps {
    header: string;
    children: React.ReactNode;
    type: string;
}

const PostsIndexLayout = ({ type, header, children }: PostsProps) => {
    const [posts, setPosts] = useState([] as PostData[]);

    useEffect(() => {
        fetch(`/api/posts/listed?types=${type}`)
            .then((res) => res.json())
            .then((data) => setPosts(data));
    }, []);

    const headerChildren = <div className="markdown">{children}</div>;

    return (
        <MainLayout title={header} headerChildren={headerChildren}>
            <div className="-mt-3">
                <Tile>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-7 md:gap-y-10 p-1 pt-2">
                        {posts && posts.map((post) => (
                            <ExtendedPostCard tags={post.tags} post={post} />
                        ))}
                    </div>
                </Tile>
            </div>
        </MainLayout>
    );
};

export default PostsIndexLayout;
