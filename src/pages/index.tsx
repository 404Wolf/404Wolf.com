import BasicPostCardGrid from "@/components/posts/BasicPostCardGrid";
import MainLayout from "@/layouts/MainLayout";
import Greeter from "@/layouts/header/Greeter";
import Tile from "@/components/misc/Tiles/Tile";
import useSize from "@/utils/useSize";
import InlineButton from "@/components/misc/InlineButton";
import useAbout from "@/components/about/useAbout";
import Image from "next/image";
import {MouseEvent, useState} from "react";
import Head from "next/head";
import {BasicPostData} from "@/components/posts/BasicPostCard";
import {PrismaClient} from "@prisma/client";
import MakeApmt from "@/components/misc/MakeApmt";
import {useSession} from "next-auth/react";
import EditorArea from "@/components/editor/Editor";
import s3 from "@/utils/aws";

const prisma = new PrismaClient();

export async function getServerSideProps() {
    const featuredPosts = await prisma.post.findMany({
        where: {
            tags: {
                has: "featured",
            },
        },
        include: {
            resources: true,
        },
    });

    return {
        props: {
            basicAbout: await s3.getResource(process.env.NEXT_PUBLIC_BASIC_ABOUT_OBJECT_NAME as string, "utf-8"),
            posts: featuredPosts.map((post) => {
                const covers = post.resources.filter((resource) =>
                    post.covers.includes(resource.id)
                );

                return {
                    coverUrls: covers.map((cover) => cover.url),
                    coverAlts: covers.map((cover) => cover.description),
                    path: `/posts/${post.type}/${post.id}`,
                    type: post.type,
                    tags: post.tags,
                    date: post.date,
                    title: post.title,
                };
            }),
        },
    };
}

interface HomeProps {
    posts: BasicPostData[];
    basicAbout: string;
}

const Home = ({posts, basicAbout}: HomeProps) => {
    const profileImageMe = "/resources/profileMeAlt.webp";
    const profileImageDog = "/resources/profileDog.webp";

    const session = useSession();
    const screenSize = useSize();
    const about = useAbout();
    const [makeApmtOpen, setMakeApmtOpen] = useState(false);
    const tileTitleWidths = "w-[7rem] sm:w-[8rem]";

    const [profileImageSrc, setProfileImageSrc] = useState(profileImageMe);
    const profileImage = (
        <Image
            onMouseEnter={(e: MouseEvent) => setProfileImageSrc(profileImageDog)}
            onMouseLeave={(e: MouseEvent) => setProfileImageSrc(profileImageMe)}
            priority
            fill
            src={profileImageSrc}
            alt="Profile"
            className="rounded-[2rem] xs:rounded-[2.5rem] border-[6px] sm:border-[5px] border-slate-400"
        />
    );
    const headerChildren = (
        <div>
            <div className="hidden xs:block xs:h-32 xs:w-32 md:h-30 md:w-30 relative float-right ml-1 sm:ml-2">
                {profileImage}
            </div>

            <div className="markdown">
                <p className="mb-2">
                    I'm a <InlineButton externalTo="https://case.edu">CWRU</InlineButton> student
                    with a passion for tinkering, tech, coding, Ancient Latin, D&D, strategy board
                    games, creating, designing, engineering, geeking, making, and figuring things
                    out.
                </p>
                <p>
                    Information, projects, contacts, my resume, and more can be found on this
                    website. If you have any questions, feel free to{" "}
                    <InlineButton externalTo={`mailto:${about.email}`}>email me</InlineButton> or{" "}
                    <InlineButton onClick={() => setMakeApmtOpen(true)}>
                        meet with me
                    </InlineButton>
                    .
                </p>
            </div>
        </div>
    );

    return (
        <>
            <Head>
                <title>Wolf Mermelstein</title>
            </Head>
            <MainLayout
                title={<Greeter/>}
                titleWidth="w-[19.5rem] sm:w-[23.6rem]"
                headerChildren={headerChildren}
                subtitleFixedWidth={tileTitleWidths}
            >
                <MakeApmt open={makeApmtOpen} setOpen={setMakeApmtOpen}/>
                <div className="flex flex-col gap-7">
                    <div className="flex flex-col min-[520px]:flex-row gap-7 sm:gap-6">
                        <div className="sm:basis-[30%]">
                            <Tile title="Featured" fixedTitleWidth={tileTitleWidths}>
                                <BasicPostCardGrid
                                    onlyFeatured
                                    posts={posts}
                                    showTags={["ongoing"]}
                                    minAmount={screenSize[0] <= 640 ? 6 : undefined}
                                    gridConfig="grid-cols-2 min-[520px]:grid-cols-1"
                                />
                            </Tile>
                        </div>

                        <div className="basis-[75%]">
                            <Tile title="About" fixedTitleWidth={tileTitleWidths}>
                                <EditorArea
                                    startingText={basicAbout}
                                    objectName={process.env.NEXT_PUBLIC_BASIC_ABOUT_OBJECT_NAME as string}
                                />
                            </Tile>
                        </div>
                    </div>
                </div>
            </MainLayout>
        </>
    );
};

export default Home;
