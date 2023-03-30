import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import rehypeRaw from "rehype-raw";
import Tile from "../components/misc/Tile";
import MdImage from "../components/misc/MdImage";
import MainLayout from "./MainLayout";
import { useEffect, useState } from "react";
import useSize from "@/utils/useSize";
import PostData from "@/components/posts/PostData";
import { parseMd } from "@/utils/parseMd";
import { randomListItem } from "@/utils/misc";

interface PostLayoutProps {
    postId: string;
    type: string;
}

const PostLayout = ({ postId, type }: PostLayoutProps) => {
    const windowSize = useSize();
    const [postData, setPostData] = useState<PostData | null>(null);
    const [postMd, setPostMd] = useState("Loading...");
    const [postIcon, setPostIcon] = useState<string | null>(null);

    useEffect(() => {
        fetch(String(`/api/posts/byId?id=${postId}&type=projects`))
            .then((res) => res.json())
            .then((data) => setPostData(data.data));
    }, [postId]);

    useEffect(() => {
        console.log(String(`/api/posts/md?id=${postId}&type=projects`))
        fetch(String(`/api/posts/md?id=${postId}&type=projects`))
            .then((res) => res.text())
            .then((data) => setPostMd(parseMd(data, postId, windowSize[0])))
            .then(() => console.log(postMd))
    }, [postData, postId, windowSize]);

    useEffect(() => {
        if (postData) {
            const timeout = setTimeout(() => {
                setPostIcon(randomListItem(postData.covers));
            }, 1000);
            return () => clearTimeout(timeout);
        }
    }, [postData]);

    return (
        <MainLayout title={postData ? postData.name : "Project"} header={false}>
            <div className={postData ? "mt-[5px]" : ""}>
                {postData && (
                    <Tile
                        title="Overview"
                        className="overflow-auto"
                        direction="right"
                    >
                        {postIcon && (
                            <div className="relative pointer-events-none w-3/5 sm:w-[17%] ml-2 float-right">
                                <MdImage src={postIcon} />
                            </div>
                        )}
                        <div className="markdown">{postData?.description}</div>
                    </Tile>
                )}
                <div className="m-6" />
                <Tile className="overflow-auto" title={type} direction="right">
                    <ReactMarkdown className="markdown" rehypePlugins={[rehypeRaw]}>
                        {postMd}
                    </ReactMarkdown>
                </Tile>
            </div>
        </MainLayout>
    );
};

export default PostLayout;
