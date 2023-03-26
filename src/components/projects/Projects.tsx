import Project from "@/components/projects/Project";
import Tile from "@/components/misc/Tile";
import ProjectData from "@/interfaces/project_data";
import useSize from "@/hooks/useSize";

interface ProjectsProps {
    projects: ProjectData;
}

const Projects = ( { projects }: ProjectsProps ) => {
    const gridProjects = Object.values(projects)
    const screenSize = useSize()

    let totalProjectCount
    if (screenSize[0] <= 400) totalProjectCount = 12
    else if (screenSize[0] <= 550) totalProjectCount = 10
    else if (screenSize[0] <= 650) totalProjectCount = 12
    else if (screenSize[0] <= 768) totalProjectCount = 10
    else if (screenSize[0] <= 1024) totalProjectCount = 12
    else if (screenSize[0] <= 1280) totalProjectCount = 24
    else totalProjectCount = 30

    // Fill projects up with dummy projects to make the grid look nice
    // We want a minimum of 20 projects
    while (gridProjects.length < totalProjectCount) {
        gridProjects.push(null)
    }

    return (
        <div>
            <Tile title="Projects">
                <div className="pt-3 sm:pt-2 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 justify-between items-center gap-4 sm:gap-5">
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
