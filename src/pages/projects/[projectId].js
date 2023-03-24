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

const Project = ({ projectId, projectData }) => {
    const [ projectMd, setProjectMd ] = useState('Loading...')

    const [windowWidth, setWindowWidth] = useState(null);

    useEffect(() => {
        const handleResize = () => {
        setWindowWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        setWindowWidth(window.innerWidth);
    }, []);

    useEffect(() => {
        fetch(`/projects/${projectId}/project.md`)
            .then(res => res.text())
            .then(text => {
                const replacer = (match, alt, filename, width, height, float, clear) => {
                    let idealWidth

                    if (!height) {
                        if (windowWidth < 460) {
                            idealWidth = width ? Number(width) + 37 : 52
                            float = "right"
                            clear = "both"
                        }
                        else if (windowWidth < 1000) {
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
            })
    }, [projectId, windowWidth])

    return (
        <MainLayout header={ projectData.name }>
            <div className={projectData.description && "mt-1"}>
                {projectData.description && 
                <Tile title="Overview" className="mb-6 overflow-auto" direction="right">
                    <div className="relative pointer-events-none w-2/5 sm:w-[13%] ml-2 float-right">
                        <ProjectImage src={ projectData.cover }/>
                    </div>
                    <div className="markdown">
                        {projectData.description}
                    </div>
                </Tile>}

                <Tile className="overflow-auto" title="Project" direction="right">
                    <ReactMarkdown className="markdown" rehypePlugins={[rehypeRaw]}>
                        {projectMd}
                    </ReactMarkdown>
                </Tile>
            </div>
        </MainLayout>
    );
}

export async function getServerSideProps({ params }) {
    console.log(params)
    return {
        props: {
            projectId: params.projectId,
            projectData: projectFromId(params.projectId)
        }
    }
}

export default Project;