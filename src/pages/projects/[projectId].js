import MainLayout from '@/components/layouts/MainLayout';
import Card from '@/components/misc/Card';
import fs from 'fs';
import path from 'path';
import { useEffect, useState } from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

export async function getStaticPaths () {
    const filePath = path.join(process.cwd(), 'public', 'projects/projects.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const projectIds = JSON.parse(fileContents).projectIds;
    const paths = []

    for (let i=0; i < projectIds.length; i++) {
        paths.push({
            params: { projectId: projectIds[i] }
        })
    }
    return {
        paths,
        fallback: false
    }
}

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

export async function getStaticProps({ params }) {
    const projectData = JSON.parse(
        // current directory > public > projects > [projectId] > project.json
        fs.readFileSync(
            path.join(
                process.cwd(), 
                'public', 
                'projects', 
                params.projectId, 
                'project.json'
            ), 'utf8'
        )
    );

    return {
        props: {
            projectId: params.projectId,
            projectData: projectData
        }
    }
}

export default Project;