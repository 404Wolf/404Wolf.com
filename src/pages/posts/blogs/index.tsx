import PostsIndexLayout from "@/layouts/PostsIndexLayout";
import Head from "next/head";

const Blogs = () => {
    return (
        <>
            <Head>
                <title>Wolf Mermelstein | Blogs </title>
            </Head>
            <PostsIndexLayout header="Blogs" type="blogs">
                Here I'll be posting various blogs about various topics. This is still a
                very new page, so there's not much here yet. I'll be adding more content
                soon!
            </PostsIndexLayout>
        </>
    );
};

export default Blogs;
