import PostLayout from "@/layouts/PostLayout";
import Head from "next/head";

interface BlogParams {
    params: {
        blogId: string;
    };
}

export async function getServerSideProps({ params: { blogId } }: BlogParams) {
    return {
        props: {
            blogId,
        },
    };
}

interface BlogProps {
    blogId: string;
}

const Blog = ({ blogId }: BlogProps) => {
    return (
        <>
            <Head>
                <title>{`Blogs/${blogId}`}</title>
            </Head>
            <PostLayout
                postId={blogId}
                type="blogs"
                title="Blog"
            />
        </>
    );
};

export default Blog;
