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
                    let extraWidth

                    if (windowWidth < 400) {
                        extraWidth = 32
                    }
                    else if (windowWidth < 600) {
                        extraWidth = 26
                    }
                    else if (windowWidth < 1000) {
                        extraWidth = 14
                    }
                    else if (windowWidth < 1300) {
                        extraWidth = 8
                    }
                    else {
                        extraWidth = 2
                    }

                    // Ideal width is the width of the image, plus 20 pixels if the window is less
                    // than 400 pixels wide. We map it to a percentage of the window width (out of 100%).
                    let idealWidth = (Number(width) + extraWidth)
                    if (idealWidth > 100) {
                        idealWidth = 100
                    }

                    const styles = {
                        float: float ? `${float}` : 'right',
                        width: width ? `${idealWidth}%` : height ? "" : "25%",
                        height: height ? `${height}px` : "",
                        marginRight: float == "left" ? "1rem" : "",
                        marginLeft: float == "right" ? "1rem" : "",
                    }

                    const replaced = (
                        <ProjectImage 
                            src={ `${projectId}/resources/${filename}` } 
                            styles={ styles }
                            tag={ alt }
                            clear={ clear }
                            float={ float }
                        />
                    )
                    return ReactDOMServer.renderToString(replaced)
                }

                text = text.replaceAll(/!\[(.*)\]\((.*\.webp)\|?(?:width=(\d+))?\|?(?:height=(\d+))?\|?(?:float=([a-z]+))?\)?\|?(?:clear=([a-z]+))?\)/g, replacer);
                setProjectMd(text)
            })
    }, [projectId, windowWidth])

    return (
        <MainLayout header={ projectData.name }>
            <div className={projectData.description && "mt-1 sm:mt-10"}>
                {projectData.description && 
                <Tile title="Overview" className="flex gap-5 mb-6">
                    <div className="basis-5/6">
                        {projectData.description}
                    </div>
                    <div className="relative basis-1/6 pointer-events-none">
                        <ProjectImage src={ projectData.cover }/>
                    </div>
                </Tile>}

                <Tile className="overflow-auto" title="Project">
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