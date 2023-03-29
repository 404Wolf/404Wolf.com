import PostData from "@/components/posts/PostData";
import PostsIndexLayout from "@/layouts/PostsIndexLayout";
import Head from "next/head";
import { useEffect, useState } from "react";

const Blogs = () => {
    const [blogs, setBlogs] = useState([] as PostData[]);
    
    useEffect(() => {
        fetch("/api/posts/listed?type=blogs&loose=true")
            .then((res) => res.json())
            .then((data) => setBlogs(data.data));
    }, []);

    return (
        <>
            <Head>
                <title>Wolf Mermelstein | Blogs </title>
            </Head>
            <PostsIndexLayout header="Blogs" posts={blogs}>
                Here I'll be posting various blogs about various topics. This is still a
                very new page, so there's not much here yet. I'll be adding more content
                soon!
            </PostsIndexLayout>
        </>
    );
};

export default Blogs;
