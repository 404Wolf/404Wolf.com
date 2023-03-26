import MainLayout from "@/components/layouts/MainLayout";
import Tile from "@/components/misc/Tile";
import PostCardGrid from "@/components/posts/PostCardGrid";
import PostData from "@/components/posts/PostData";
import { list_projects as list_projects } from "../api/projects/listed";
import Navbar from "@/components/header/Navbar";
import useSize from "@/utils/useSize";
import { useEffect, useState } from "react";

export async function getStaticProps() {
    const projects = await list_projects()

    return {
        props: {
            projects
        },
    }
}

interface ProjectsProps {
    projects: PostData[]
}

const Projects = ({ projects }: ProjectsProps) => {
    const screenSize = useSize()
    const [ minProjects, setMinProjects ] = useState(6)

    useEffect(() => {
        if (screenSize[0] <= 640) {
            setMinProjects(8)
        }
        else if (screenSize[0] <= 1024) {
            setMinProjects(9)
        }
        else {
            setMinProjects(12)
        }
    }, [screenSize[0]])

    return (
        <MainLayout header="Projects">
            <div className="mb-8">
                <Tile className="markdown">
                    <p>
                        This page is to showcase some of the projects I've worked on. It's a healthy blend of personal projects, academic projects, and more. Not all the projects are code-related, but many are. Each project has its own page with more information about it, so feel free to click on any of them to learn more. If you have any questions, feel free to contact me. More projects will be coming soon!
                    </p>
                    <Navbar/>
                </Tile>
            </div>
            <Tile title="Projects">
                <PostCardGrid 
                    posts={ projects }
                    minAmount={ minProjects }
                    gridConfig="grid grid-cols-2 sm:grid-cols-3"
                />
            </Tile>
        </MainLayout>
    );
}
 
export default Projects;