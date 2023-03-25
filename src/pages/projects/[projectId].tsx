import MainLayout from '@/components/layouts/MainLayout';
import Tile from '@/components/misc/Tile';
import { useEffect, useRef, useState } from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { worker as projectFromId } from '../api/projects/by_id';
import rehypeRaw from 'rehype-raw'
import ReactDOMServer from 'react-dom/server';
import Tag from '@/components/misc/Tag';
import Link from 'next/link';
import ProjectImage from '@/components/projects/ProjectImage';
import Image from "next/image"
import useSize from '@/hooks/useSize';
import ProjectData from '../../interfaces/project_data';

interface ProjectProps {
    projectId: string;
    projectData: ProjectData;
}

const Project = ({ projectId, projectData }: ProjectProps) => {
    const [ projectMd, setProjectMd ] = useState('Loading...')
    const [ ready, setReady ] = useState(false)
    const windowSize = useSize()

    useEffect(() => {
        fetch(`/projects/${projectId}/project.md`)
            .then(res => res.text())
            .then(text => {
                const replacer = (
                    match: string, 
                    alt: string, 
                    filename: string, 
                    width: string, 
                    height: string, 
                    float: "left" | "right" | "none", 
                    clear: "left" | "right" | "both" | "none"
                ) => {
                let idealWidth

                if (!height) {
                    if (windowSize[0] < 460) {
                        idealWidth = width ? Number(width) + 37 : 52
                        float = "right"
                        clear = "both"
                    }
                    else if (windowSize[0] < 1000) {
                        idealWidth = width ? (Number(width) + 20) : 30
                    }
                    else {
                        idealWidth = width ? (Number(width) + 9) : 21
                    }
                    idealWidth = Math.min(idealWidth, 100)
                }

                if (!float) {
                    float = "right"
                }

                const styles = {
                    float: float ? `${float}` : 'right',
                    width: `${idealWidth}%`,
                    height: height ? `${height}px` : "",
                    marginRight: float == "left" ? "1rem" : "",
                    marginLeft: float == "right" ? "1rem" : "",
                    clear: clear ? clear : "",
                }

                const replaced = (
                    <ProjectImage 
                        src={ `${projectId}/resources/${filename}` } 
                        styles={ styles }
                        tag={ alt }
                        float={ float }
                    />
                )
                return ReactDOMServer.renderToString(replaced)
            }

            text = text.replace(/#\s*(.*)/, "<h1 class='!mt-[-.5em]'>$1</h1>")
            text = text.replaceAll(/!\[(.*)\]\((.*\.webp)\|?(?:width=(\d+))?\|?(?:height=(\d+))?\|?(?:float=([a-z]+))?\)??\|?(?:clear=([a-z]+))?\)?/g, replacer);
            setProjectMd(text)
            setReady(true)
        })
    }, [projectId, windowSize])

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
                        { projectMd }
                    </ReactMarkdown>
                </Tile>
            </div>
        </MainLayout>
    );
}

interface ProjectParams {
    params: {
        projectId: string;
    }
}

export async function getServerSideProps({ params: { projectId } }: ProjectParams) {
    return {
        props: {
            projectId: projectId,
            projectData: projectFromId(projectId)
        }
    }
}

export default Project;
