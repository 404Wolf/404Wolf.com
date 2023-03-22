import Project from "./Project";
import "react";
import Tile from "../misc/Tile";
import { Grid } from "@material-ui/core";

const Projects = ( { projects } ) => {
    const gridProjects = Object.values(projects)

    // Fill projects up with dummy projects to make the grid look nice
    // We want a minimum of 20 projects
    while (gridProjects.length < 20) {
        gridProjects.push(null)
    }

    return (
        <div>
            <Tile title="Projects">
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 justify-between items-center gap-5">
                    {Object.values(projects).map(
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

