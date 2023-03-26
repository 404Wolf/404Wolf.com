import Project from "@/components/projects/Project";
import Tile from "@/components/misc/Tile";
import ProjectData from "@/interfaces/project_data";

interface ProjectsProps {
    projects: (ProjectData | null)[];
    featuredOnly?: boolean;
    projectTags?: boolean;
    minAmount?: number;
    className?: string;
}

const Projects = ( { projects, minAmount: showAmount, featuredOnly, className, projectTags }: ProjectsProps ) => {
    if (featuredOnly) {
        projects = projects.filter(project => (project === null) ? false : project.featured)
    }

    if (showAmount) {
        // Fill projects up with dummy projects to make the grid look nice
        // We want a minimum of 20 projects
        while (projects.length < showAmount) {
            projects.push(null)
        }
    }

    return (
        <div className={ className }>
            {projects.map(
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
                                projectTag={ projectTags }
                            />
                        )
                    }
                }
            )}
        </div>
    );
}
 
export default Projects;
