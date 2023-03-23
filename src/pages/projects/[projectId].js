import MainLayout from '@/components/layouts/MainLayout';
import Tile from '@/components/misc/Tile';
import { useEffect, useRef, useState } from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { worker as projectFromId } from '../api/projects/by_id';
import rehypeRaw from 'rehype-raw'
import ReactDOMServer from 'react-dom/server';
import Tag from '@/components/misc/Tag';

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
                const replacer = (match, alt, path, width, height, float) => {
                    let extraWidth

                    if (windowWidth < 400) {
                        extraWidth = 30
                    }
                    else if (windowWidth < 600) {
                        extraWidth = 25
                    }
                    else if (windowWidth < 800) {
                        extraWidth = 20
                    }
                    else if (windowWidth < 1000) {
                        extraWidth = 10
                    }
                    else {
                        extraWidth = 0
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
                        <div className="relative inline-block float-right container my-2" style={ styles }>
                            <img
                                src={`${projectId}/${path}`}
                                alt={alt}
                                className="border-slate-500 border-4"
                            />
                            <Tag position={ (float == "left") ? "br" : "bl" }>
                                {alt}
                            </Tag>
                        </div>
                    )
                    return ReactDOMServer.renderToString(replaced)
                }

                text = text.replaceAll(/!\[(.*)\]\((.*\.webp)\|?(?:width=(\d+))?\|?(?:height=(\d+))?\|?(?:float=([a-z]+))?\)/g, replacer);
                setProjectMd(text)
            })
    }, [projectId, windowWidth])

    return (
        <MainLayout header={ projectData.name }>
            <div>
                <Tile className="overflow-auto">
                    <ReactMarkdown className="markdown" rehypePlugins={[rehypeRaw]}>
                        {projectMd}
                    </ReactMarkdown>
                </Tile>
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