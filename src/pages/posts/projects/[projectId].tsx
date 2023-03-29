import { useEffect, useState } from "react";
import useSize from "@/utils/useSize";
import PostData from "../../../components/posts/PostData";
import { parseMd } from "@/utils/parseMd";
import PostLayout from "@/layouts/PostLayout";
import Head from "next/head";
import { randomListItem } from "@/utils/misc";

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
    const windowSize = useSize();
    const [projectData, setProjectData] = useState<PostData | null>(null);
    const [projectMd, setProjectMd] = useState("Loading...");

    useEffect(() => {
        fetch(String(`/api/posts/byId?id=${projectId}&type=projects`))
            .then((res) => res.json())
            .then((data) => setProjectData(data.data))
    }, [projectId]);

    useEffect(() => {
        fetch(String(`/api/posts/md?id=${projectId}`))
            .then((res) => res.text())
            .then((data) => setProjectMd(
                parseMd(data, projectId, windowSize[0])
            ))
    }, [projectData, projectId]);

    return (
        <>
            <Head>
                <title>{`Projects/${projectId}`}</title>
            </Head>
            {projectData && (
                <PostLayout
                    header={projectData.name}
                    type="Project"
                    md={projectMd}
                    summary={projectData.description}
                    icon={randomListItem(projectData.covers)}
                />
            )}
        </>
    );
};

export default Project;
