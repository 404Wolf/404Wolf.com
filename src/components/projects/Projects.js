import Project from "./Project";
import "react";
import { useEffect, useState } from "react";
import Card from "../misc/Card";
import { projects as projectNames} from "@/projects/projects.json";

const Projects = ({ gap }) => {
    // A list of project IDs to include, in order. 
    // Automatically fetches data from the project's data.json file.

    let projects = projectNames.map(project => useState(project))
    for (let i = 0; i < 20; i++) {
        projects.push(useState(null))
    }
    
    useEffect(() => {
        projects.forEach(
            (project) => {
                if (typeof project[0] === "string") {
                    import("@/projects/" + project[0] + "/project.json")
                    .then(fetched => project[1](fetched))
                    .catch(err => console.log(err))
                }
            }
        )
    }, [projects])

    return (
        <div>
            <Card title="Projects">
                <div className={`grid grid-cols-1 md:grid-cols-2 justify-between items-center gap-${gap}`}>
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
                                        date={ project.date }
                                        key={ index }
                                    />
                                }
                            }
                        )
                    }
                </div>
            </Card>
        </div>
    );
}
 
export default Projects;