import MainLayout from "@/layouts/MainLayout";
import Tile from "@/components/misc/Tile";
import PostCardGrid from "@/components/posts/PostCardGrid";
import PostData from "@/components/posts/PostData";
import useSize from "@/utils/useSize";
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
        fetch(`/api/posts/listed?types=${type}&loose=true`)
            .then((res) => res.json())
            .then((data) => setPosts(data.data));
    }, []);

    const headerChildren = <div className="markdown">{children}</div>;

    return (
        <MainLayout title={header} headerChildren={headerChildren}>
            <div className="-mt-3">
                <Tile>
                    <div className="grid grid-cols-1 gap-4">
                        {posts.map(post => <ExtendedPostCard post={post} />)}
                    </div>
                </Tile>
            </div>
        </MainLayout>
    );
};

export default PostsIndexLayout;
