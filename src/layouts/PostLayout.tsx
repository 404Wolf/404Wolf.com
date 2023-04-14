import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import rehypeRaw from "rehype-raw";
import Tile from "../components/misc/Tile";
import MdImage from "../components/misc/MdImage";
import MainLayout from "./MainLayout";
import { useEffect, useState } from "react";
import useSize from "@/utils/useSize";
import PostData from "@/components/posts/PostData";
import { parseMd } from "@/utils/parseMd";
import { randomListItem, toTitleCase } from "@/utils/misc";
import Image from "next/image";

interface PostLayoutProps {
    postId: string;
    type: string;
    title: string;
}

const PostLayout = ({ postId, type, title }: PostLayoutProps) => {
    const windowSize = useSize();
    const [postData, setPostData] = useState<PostData | null>(null);
    const [postMd, setPostMd] = useState("Loading...");

    useEffect(() => {
        fetch(String(`/api/posts/byId?id=${postId}&type=${type}`))
            .then((res) => res.json())
            .then((data) => setPostData(data.data));
    }, [postId]);

    useEffect(() => {
        fetch(String(`/api/posts/md?id=${postId}&type=${type}`))
            .then((res) => res.text())
            .then((data) => setPostMd(parseMd(data, windowSize[0], postId, type)));
    }, [postData, postId, windowSize]);

    return (
        <MainLayout title={postData ? postData.name : toTitleCase(type)} header={false}>
            <div className={postData ? "mt-[5px]" : ""}>
                {postData && (
                    <Tile title="Overview" className="overflow-auto" direction="right">
                        <div className="relative container">
                            <div className="relative pointer-events-none rounded-xl w-2/5 md:w-1/4 mt-2 ml-px md:ml-3 mb-px md:mb-3 float-right">
                                <Image
                                    priority
                                    width={400}
                                    height={400}
                                    src={postData.covers[0]}
                                    className="border-4 border-slate-500 rounded-xl"
                                    alt={`${postData.name} cover image`}
                                />
                            </div>
                            <div className="markdown">{postData?.description}</div>
                        </div>
                    </Tile>
                )}
                <div className="m-6" />
                <Tile className="overflow-auto" title={title} direction="right">
                    <div>
                    <ReactMarkdown className="markdown" rehypePlugins={[rehypeRaw]}>
                        {postMd}
                    </ReactMarkdown>
                    </div>
                </Tile>
            </div>
        </MainLayout>
    );
};

export default PostLayout;
