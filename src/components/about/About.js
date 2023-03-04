import Card from "../misc/Card";
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
        <Card title="About">
            <div className="text-left indent-10">
                <ReactMarkdown className="markdown">
                    { aboutMe }
                </ReactMarkdown>
            </div>
        </Card>
    );
}
 
export default About;