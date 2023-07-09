import { toTitleCase } from "@/utils/misc";
import Head from "next/head";
import MainLayout from "@/layouts/MainLayout";
import Tile from "@/components/misc/Tile";
import { useState } from "react";

// const prisma = new PrismaClient();

// export const getServerSideProps: GetServerSideProps = async ({ params }) => {
//     return {props: {}}
// };

interface EditorProps {
}

const Editor = ({ }: EditorProps) => {
    const post = {
        type: useState("Type"),
        id: useState("Id"),
        title: useState("Title"),
        cover: useState("Cover"),
        description: useState("Description"),
        markdown: useState("Markdown"),
        resources: useState<{ [key: string]: string }>({})
    }
    
    return (
        <>
            <Head>
                <title>Post Editor</title>
            </Head>
            <MainLayout title={toTitleCase(post.title[0])} header={false}>
                <div className="mt-[5px] overflow-visible">
                    <Tile title="Overview" direction="right">
                        <div className="h-fit overflow-auto">
                            Description editor will be here.
                        </div>
                    </Tile>

                    <div className="m-6" />
                    <Tile className="overflow-auto" title={post.title[0]} direction="right">
                        Markdown editor will be here.
                    </Tile>
                </div>
            </MainLayout>
        </>
    );
};

export default Editor;
