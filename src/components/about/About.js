import Tile from "../misc/Tile";
import ReactMarkdown from "react-markdown";
import { useEffect, useState } from "react";

const About = () => {
    const [ aboutMe, setAboutMe ] = useState(null);

    useEffect(() => {
        fetch("/markdown/about.md")
        .then(resp => resp.text())
        .then(text => setAboutMe(text));
    }, []);

    return (
        <Tile title="About">
            <div className="text-left indent-10">
                <ReactMarkdown className="markdown">
                    { aboutMe }
                </ReactMarkdown>
            </div>
        </Tile>
    );
}
 
export default About;