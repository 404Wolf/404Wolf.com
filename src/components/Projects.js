import { useState } from "react";
import { Project } from "@/components/Project"

const Projects = () => {
    const mkProject = (name, cover, page) => {
        return {name: name, cover: cover, page: page}
    }

    let projects = [
        "hydroponics"
    ].map(
        (name) => mkProject(name, "cover.png", `/projects/${name}`)
    )

    return (
        <div>
            <div className="flex flex-wrap justify-start items-center">
                {/* {
                    <Project
                        name={ projects[0].name }
                        image={ projects[0].cover }
                        page={ projects[0].page }
                    /> 
                } */}
            </div>
        </div>
    );
}
 
export default Projects;