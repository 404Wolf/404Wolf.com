import PostLayout from "@/layouts/PostLayout";
import { toTitleCase } from "@/utils/misc";
import Head from "next/head";
import { useRouter } from "next/router";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const Post = () => {
    const router = useRouter();
    const { type, postId } = router.query;
    console.log(type, postId);
    prisma.post.findUnique({
        where: {
            id: Number(postId),
        },
    });

    return (
        <>
            <Head>
                <title>{`${postType}/${postId}`}</title>
            </Head>
            <MainLayout
                title={postData ? postData.name : toTitleCase(type)}
                header={false}
            >
                <div className={postData ? "mt-[5px]" : ""}>
                    {postData && (
                        <Tile
                            title="Overview"
                            className="overflow-auto"
                            direction="right"
                        >
                            <div className="relative pointer-events-none rounded-xl w-2/5 md:w-1/4 mt-2 ml-px md:ml-3 mb-px md:mb-3 float-right">
                                <Image
                                    width={400}
                                    height={400}
                                    src={postData.covers[0]}
                                    className="border-4 border-slate-500 rounded-xl"
                                    alt={`${postData.name} cover image`}
                                />
                            </div>
                            <div className="markdown">{postData?.description}</div>
                        </Tile>
                    )}
                    <div className="m-6" />
                    {postMd && postData ? (
                        <Tile className="overflow-auto" title={title} direction="right">
                            <div>
                                <ReactMarkdown
                                    className="markdown"
                                    children={postMd}
                                    rehypePlugins={[rehypeRaw]}
                                    components={{
                                        code({
                                            node,
                                            inline,
                                            className,
                                            children,
                                            ...props
                                        }) {
                                            const match = /language-(\w+)/.exec(
                                                className || ""
                                            );
                                            return !inline && match ? (
                                                <SyntaxHighlighter
                                                    wrapLongLines
                                                    class="!text-[12px] overflow-x-hidden"
                                                    children={String(children).replace(
                                                        /\n$/,
                                                        ""
                                                    )}
                                                    language={match[1]}
                                                    PreTag="div"
                                                    customStyle={{
                                                        borderRadius: "12px",
                                                        fontSize: "inherit",
                                                    }}
                                                />
                                            ) : (
                                                <code {...props} className={className}>
                                                    {children}
                                                </code>
                                            );
                                        },
                                    }}
                                />
                            </div>
                        </Tile>
                    ) : (
                        <div className="animate-pulse">
                            {" "}
                            <Tile> Loading... </Tile>
                        </div>
                    )}
                </div>
            </MainLayout>
        </>
    );
};

export default Blog;
