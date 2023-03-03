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
        <div>
            <div className="flex flex-wrap justify-start items-center gap-4">
                {
                    projects.map(
                        (project, index) => {
                            if (project[0] === null || typeof project[0] === "string") {
                                return <Project isDummy={ true } key={ index} />
                            }
                            else {
                                return <Project 
                                    id={ project[0].id }
                                    name={ project[0].name }
                                    cover={ project[0].cover }
                                    page={ `/projects/${project[0].name}` }
                                    key={ index }
                                />
                            }
                        }
                    )
                }
            </div>
        </div>
    );
}
 
export default Projects;