import Project from "./Project";
import "react";
import { useState } from "react";

const Projects = () => {
    // A list of project IDs to include, in order. 
    // Automatically fetches data from the project's data.json file.
    const projects = [
        "hydroponics",
        "bitwardenBackup",
    ].map(project => useState(project))
    projects.forEach(
        (project) => {
            if (typeof project[0] === "string") {
                import("@/projects/" + project[0] + "/project.json")
                .then(fetched => project[1](fetched))
                .catch(err => console.log(err))
            }
        }
    )
    for (let i = 0; i < 20; i++) {
        projects.push(useState(null))
    }

    return (
        <div className="grid grid-cols-2 lg:grid-cols-3 justify-between items-center gap-5">
            {
                projects.map(
                    ([ project ], index) => {
                        if (project === null || typeof project === "string") {
                            return <Project isDummy={ true } key={ index} />
                        }
                        else {
                            return <Project 
                                id={ project.id }
                                name={ project.name }
                                cover={ project.cover }
                                page={ "/projects/"+ project.id }
                                key={ index }
                            />
                        }
                    }
                )
            }
        </div>
    );
}
 
export default Projects;