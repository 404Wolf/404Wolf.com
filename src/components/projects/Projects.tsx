import Project from "@/components/projects/Project";
import Tile from "@/components/misc/Tile";
import ProjectData from "@/interfaces/project_data";

interface ProjectsProps {
    projects: ProjectData;
}

const Projects = ( { projects }: ProjectsProps ) => {
    const gridProjects = Object.values(projects)

    // Fill projects up with dummy projects to make the grid look nice
    // We want a minimum of 20 projects
    while (gridProjects.length < 30) {
        gridProjects.push(null)
    }

    return (
        <div>
            <Tile title="Projects">
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 justify-between items-center gap-4 sm:gap-5">
                    {Object.values(gridProjects).map(
                        (project, index) => {
                            if (project === null) {
                                return (
                                    <Project isDummy={ true } key={ index} /> 
                                )
                            }
                            else {
                                return (
                                    <Project 
                                        id={ project.id }
                                        name={ project.name }
                                        cover={ project.cover }
                                        page={ "/projects/"+ project.id }
                                        date={ project.date }
                                        key={ index }
                                    />
                                )
                            }
                        }
                    )}
                </div>
            </Tile>
        </div>
    );
}
 
export default Projects;
