import Project from "./Project";
import "react";
import { useEffect, useState } from "react";
import Card from "../misc/Card";
import { Fade, JackInTheBox } from "react-awesome-reveal";

const Projects = () => {
    // A list of project IDs to include, in order. 
    // Automatically fetches data from the project's data.json file.

    const [ projectIds, setProjectIds ] = useState([])
    const [ projects, setProjects ] = useState([])
    const dummyProjectCount = 24

    useEffect(() => {
        fetch("/projects/projects.json")
        .then((fetched) => fetched.json())
            .then((json) => json.projectIds)
            .then((projectIds) => {
                for (let i = 0; i < dummyProjectCount; i++) {
                    projectIds.push(null)
                }
                setProjectIds(projectIds)
            })
    }, [])
    
    useEffect(() => {
        async function fetchProject(projectId) {
            let fetched = await fetch("/projects/" + projectId + "/project.json")
            let json = await fetched.json()
            return json
        }

        async function fetchProjects() {
            let _projects = []
            for (let i = 0; i < projectIds.length; i++) {
                let projectId = projectIds[i]
                if (projectId === null) {
                    _projects.push([ null ])
                }
                else {
                    let project = await fetchProject(projectId)
                    _projects.push([ project ])
                }
            }
            setProjects(_projects)
        }
        
        fetchProjects()
        
    }, [projectIds])
    

    return (
        <div>
            <Card title="Projects">
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 justify-between items-center gap-5">
                        {projects.map(
                            ([ project ], index) => {
                                if (project === null) {
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
                        )}
                </div>
            </Card>
        </div>
    );
}
 
export default Projects;