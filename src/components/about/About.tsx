import Tile from "../misc/Tile";
import ReactMarkdown from "react-markdown";
import { SetStateAction, useEffect, useState } from "react";

const About = () => {
    const [ aboutMe, setAboutMe ] = useState("");

    useEffect(() => {
        fetch("/markdown/about.md")
        .then(resp => resp.text())
        .then(text => setAboutMe(text));
    }, []);

    return (
        <Tile title="About">
            <div className="pt-2 sm:pt-1 text-left indent-10">
                <ReactMarkdown className="markdown">
                    { aboutMe }
                </ReactMarkdown>
            </div>
        </Tile>
    );
}
 
export default About;
