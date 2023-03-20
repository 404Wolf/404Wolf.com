import Project from "./Project";
import "react";
import Tile from "../misc/Tile";
import { Grid } from "@material-ui/core";

const Projects = ( { projects } ) => {
    console.log(projects)
    return (
        <div>
            <Tile title="Projects">
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 justify-between items-center gap-5">
                    {Object.values(projects).map(
                        (project, index) => {
                            if (project === null) {
                                return (
                                    <Grid item key={ index}> 
                                        <Project isDummy={ true } key={ index} /> 
                                    </Grid>
                                )
                            }
                            else {
                                return (
                                    <Grid item key={ index}> 
                                        <Project 
                                            id={ project.id }
                                            name={ project.name }
                                            cover={ project.cover }
                                            page={ "/projects/"+ project.id }
                                            date={ project.date }
                                            key={ index }
                                        />
                                    </Grid>
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

