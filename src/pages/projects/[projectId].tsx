import MainLayout from '@/components/layouts/MainLayout';
import Tile from '@/components/misc/Tile';
import { useEffect, useState } from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { worker as projectFromId } from '../api/projects/by_id';
import rehypeRaw from 'rehype-raw'
import ProjectImage from '@/components/projects/ProjectImage';
import useSize from '@/hooks/useSize';
import ProjectData from '../../interfaces/project_data';
import fs from 'fs';
import path from 'path';
import { worker as fetchMd } from '../api/projects/md';
import { parseMd } from '@/workers/projects/parseMd';

interface ProjectParams {
    params: {
        projectId: string;
    }
}

export async function getStaticPaths() {
    const projectsPath = path.join(process.cwd(), "public", 'projects')
    const paths = fs.readdirSync(projectsPath).map(projectId => ({ params: { projectId: projectId } }))
    return { paths: paths, fallback: false }
}

export async function getStaticProps({ params: { projectId } }: ProjectParams) {
    return {
        props: {
            projectId: projectId,
            projectData: projectFromId(projectId),
            projectMd: fetchMd(projectId)
        }
    }
}

interface ProjectProps {
    projectId: string;
    projectData: ProjectData;
    projectMd: string;
}

const Project = ({ projectId, projectData, projectMd }: ProjectProps) => {
    const [ parsedProjectMd, setParsedProjectMd ] = useState('Loading...')
    const windowSize = useSize()

    useEffect(() => {
        setParsedProjectMd(
            parseMd(projectMd, projectId, windowSize[0])
        )
    }, [ projectMd, projectId, windowSize[0] ])

    return (
        <MainLayout header={ projectData.name }>
            <div className={projectData.description && "mt-[5px]"}>
                {projectData.description && 
                <Tile title="Overview" className={ `overflow-auto` } direction="right">
                    <div className="relative pointer-events-none w-3/5 sm:w-[17%] ml-2 float-right">
                        <ProjectImage src={ projectData.cover }/>
                    </div>
                    <div className="markdown">
                        { projectData.description }
                    </div>
                </Tile>}
                <div className='m-6'/>
                <Tile className="overflow-auto" title="Project" direction="right">
                    <ReactMarkdown className="markdown" rehypePlugins={[ rehypeRaw ]}>
                        { parsedProjectMd }
                    </ReactMarkdown>
                </Tile>
            </div>
        </MainLayout>
    );
}

export default Project;
