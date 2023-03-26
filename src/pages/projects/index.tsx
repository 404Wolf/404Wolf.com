import MainLayout from "@/components/layouts/MainLayout";
import Tile from "@/components/misc/Tile";
import ProjectsTile from "@/components/projects/Projects";
import ProjectData from "@/interfaces/project_data";
import { worker as list_projects } from "../api/projects/listed";
import Navbar from "@/components/header/Navbar";

export async function getStaticProps() {
    const projects = await list_projects()

    return {
        props: {
            projects
        },
    }
}

interface ProjectsProps {
    projects: ProjectData[]
}

const Projects = ({ projects }: ProjectsProps) => {
    return (
        <MainLayout header="Projects">
            <Tile className="mb-7 markdown">
                <p>
                    This page is to showcase some of the projects I've worked on. It's a healthy blend of personal projects, academic projects, and more. Not all the projects are code-related, but many are. Each project has its own page with more information about it, so feel free to click on any of them to learn more. If you have any questions, feel free to contact me. More projects will be coming soon!
                </p>
                <Navbar/>
            </Tile>
            <Tile title="Projects">
                <ProjectsTile 
                    projects={ projects }
                    minAmount={ 12 }
                    className="pt-3 sm:pt-2 grid grid-cols-2 md:grid-cols-3 justify-between items-center gap-4 sm:gap-5"
                />
            </Tile>
        </MainLayout>
    );
}
 
export default Projects;