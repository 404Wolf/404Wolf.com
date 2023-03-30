import MainLayout from "@/layouts/MainLayout";
import Tile from "@/components/misc/Tile";
import PostCardGrid from "@/components/posts/PostCardGrid";
import PostData from "@/components/posts/PostData";
import useSize from "@/utils/useSize";
import { useEffect, useState } from "react";

interface PostsProps {
    header: string;
    children: React.ReactNode;
    type: string;
}

const PostsIndexLayout = ({ type, header, children }: PostsProps) => {
    const screenSize = useSize();
    const [minPosts, setMinPosts] = useState(6);
    const [posts, setPosts] = useState([] as PostData[]);
    
    useEffect(() => {
        fetch(`/api/posts/listed?types=${type}&loose=true`)
            .then((res) => res.json())
            .then((data) => setPosts(data.data));
    }, []);

    useEffect(() => {
        if (screenSize[0] <= 640) {
            setMinPosts(8);
        } else if (screenSize[0] <= 1024) {
            setMinPosts(9);
        } else {
            setMinPosts(12);
        }
    }, [screenSize[0]]);

    const headerChildren = <div className="markdown">{children}</div>;

    return (
        <MainLayout title={header} headerChildren={headerChildren}>
            <div className="-mt-3">
                <Tile>
                    <PostCardGrid
                        posts={posts}
                        minAmount={minPosts}
                        gridConfig="grid grid-cols-2 sm:grid-cols-3"
                    />
                </Tile>
            </div>
        </MainLayout>
    );
};

export default PostsIndexLayout;
