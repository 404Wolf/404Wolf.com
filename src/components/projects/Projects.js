import Project from "./Project";
import "react";

const Projects = () => {
    // const mkProject = (name, cover, page) => {
    //     return {name: name, cover: cover, page: page}
    // }

    // let projects = [
    //     "hydroponics"
    // ].map(
    //     (name) => mkProject(name, "cover.png", `/projects/${name}`)
    // )
    // console.log(projects)

    return (
        <div>
            <div className="flex flex-wrap justify-start items-center">
                <Project name="hydroponics" image="cover.png" page="/projects/hydroponics"/>
                <p>test</p>
                
            </div>
        </div>
    );
}
 
export default Projects;