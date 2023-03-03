import Project from "./Project";
import "react";
import { useState } from "react";

const Projects = () => {
    // A list of project IDs to include, in order. 
    // Automatically fetches data from the project's data.json file.
    const projects = [
        useState("hydroponics"),
        useState("bitwardenBackup"),
    ]
    projects.forEach(
        (project) => {
            if (typeof project[0] === "string") {
                import("@/projects/" + project[0] + "/project.json")
                .then(fetched => project[1](fetched))
                .catch(err => console.log(err))
            }
        }
    )

    return (
        <div>
            <div className="flex flex-wrap justify-start items-center">
                {
                    projects.map(
                        (project, index) => {
                            if (typeof project[0] !== "string") 
                                {
                                    return <Project 
                                        id={ project[0].id }
                                        name={ project[0].name }
                                        image={ project[0].cover }
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