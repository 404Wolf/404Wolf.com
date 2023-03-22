import MainLayout from '@/components/layouts/MainLayout';
import { useEffect, useState } from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { worker as projectFromId } from '../api/projects/by_id';

const Project = ({ projectId, projectData }) => {
    const [ projectMd, setProjectMd ] = useState('Loading...')

    useEffect(() => {
        fetch(`/projects/${projectId}/project.md`)
            .then(res => res.text())
            .then(text => {
                text = text.replace(/!\[(.*)\]\((.*)\)/, `![$1](/projects/${projectId}/$2)`);
                setProjectMd(text)
            })
    }, [projectId])

    return (
        <MainLayout header={projectData.name}>
            <div>
                <Card className="overflow-auto">
                    <ReactMarkdown className="markdown">
                        {projectMd}
                    </ReactMarkdown>
                </Card>
            </div>
        </MainLayout>
    );
}

export async function getServerSideProps({ params }) {
    return {
        props: {
            projectId: params.projectId,
            projectData: projectFromId(params.projectId)
        }
    }
}

export default Project;