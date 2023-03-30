import PostLayout from "@/layouts/PostLayout";
import Head from "next/head";

interface ProjectParams {
    params: {
        projectId: string;
    };
}

export async function getServerSideProps({ params: { projectId } }: ProjectParams) {
    return {
        props: {
            projectId: projectId,
        },
    };
}

interface ProjectProps {
    projectId: string;
}

const Project = ({ projectId }: ProjectProps) => {
    return (
        <>
            <Head>
                <title>{`Projects/${projectId}`}</title>
            </Head>
            <PostLayout
                postId={projectId}
                type="projects"
            />
        </>
    );
};

export default Project;
