import MainLayout from '@/components/layouts/main';
import fs from 'fs';
import path from 'path';

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

const Project = ({ projectId }) => {
    return (
        <MainLayout>
            <h1>{ projectId }</h1>
        </MainLayout>
    );
}

export async function getStaticProps({ params }) {
    return {
        props: {
            projectId: params.projectId
        }
    }
}

export default Project;