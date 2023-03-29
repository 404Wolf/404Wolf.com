import { useEffect, useState } from "react";
import useSize from "@/utils/useSize";
import PostData from "../../../components/posts/PostData";
import { parseMd } from "@/utils/parseMd";
import PostLayout from "@/layouts/PostLayout";
import Head from "next/head";
import { randomListItem } from "@/utils/misc";

interface BlogParams {
    params: {
        blogId: string;
    };
}

export async function getServerSideProps({ params: { blogId } }: BlogParams) {
    return {
        props: {
            blogId: blogId,
        },
    };
}

interface BlogProps {
    blogId: string;
}

const Blog = ({ blogId }: BlogProps) => {
    const windowSize = useSize();
    const [blogData, setBlogData] = useState<PostData | null>(null);
    const [blogMd, setBlogMd] = useState("Loading...");

    useEffect(() => {
        fetch(String(`/api/posts/byId?id=${blogId}&type=blogs`))
            .then((res) => res.json())
            .then((data) => setBlogData(data.data));
    }, [blogId]);

    useEffect(() => {
        fetch(String(`/api/posts/md?id=${blogId}`))
            .then((res) => res.text())
            .then((data) => setBlogMd(parseMd(data, blogId, windowSize[0])));
    }, [blogData, blogId]);

    return (
        <>
            <Head>
                <title>{`Blogs/${blogId}`}</title>
            </Head>
            {blogData && (
                <PostLayout
                    header={blogData.name}
                    type="Blog"
                    md={blogMd}
                    summary={blogData.description}
                    icon={randomListItem(blogData.covers)}
                />
            )}
        </>
    );
};

export default Blog;
