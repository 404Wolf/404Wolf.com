import { useEffect, useState } from "react";
import useSize from "@/utils/useSize";
import { parseMd } from "@/utils/parseMd";
import PostLayout from "@/layouts/PostLayout";
import { postById } from "@/pages/api/posts/byId";
import { postMd } from "@/pages/api/posts/md";
import { listTypePosts } from "@/pages/api/posts/listed";
import PostData from "@/components/posts/PostData";
import Head from "next/head";

export async function getStaticPaths() {
    const blogs = listTypePosts("blogs")?.map((blog) => blog.id);
    return {
        paths: blogs?.map((blog) => ({ params: { blogId: blog } })),
        fallback: false,
    };
}

interface BlogParams {
    params: {
        blogId: string;
    };
}

export async function getStaticProps({ params: { blogId } }: BlogParams) {
    return {
        props: {
            blogId: blogId,
            blogData: postById(blogId, "blogs"),
            blogMd: postMd(blogId),
        },
    };
}

interface blogProps {
    blogId: string;
    blogData: PostData;
    blogMd: string;
}

const blog = ({ blogId, blogData, blogMd }: blogProps) => {
    const [parsedBlogMd, setParsedBlogMd] = useState("Loading...");
    const windowSize = useSize();

    useEffect(() => {
        setParsedBlogMd(parseMd(blogMd, blogId, windowSize[0]));
    }, [blogMd, blogId, windowSize[0]]);

    return (
        <>
            <Head>
                <title>{`Wolf Mermelstein | Blogs | ${blogId}`}</title>
            </Head>
            <PostLayout
                header={blogData.name}
                type="Blog"
                md={parsedBlogMd}
                summary={blogData.description}
                icon={blogData.cover}
            />
        </>
    );
};

export default blog;
