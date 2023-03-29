import PostData from "@/components/posts/PostData";
import PostsIndexLayout from "@/layouts/PostsIndexLayout";
import { listTypePosts } from "@/pages/api/posts/listed";
import Head from "next/head";

export async function getStaticProps() {
    const blogs = await listTypePosts("blogs");
    return { props: { blogs } };
}

interface BlogsProps {
    blogs: PostData[];
}

const Blogs = ({ blogs }: BlogsProps) => {
    return (
        <>
            <Head>
                <title>Wolf Mermelstein | Blogs </title>
            </Head>
            <PostsIndexLayout header="Blogs" posts={blogs}>
                Here I'll be posting various blogs about various topics. This is still a very new page, so there's not much here yet. I'll be adding more content soon!
            </PostsIndexLayout>
        </>
    );
};

export default Blogs;
