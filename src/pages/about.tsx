import { useState, useEffect } from "react";
import Tile from "@/components/misc/Tile";
import MainLayout from "@/layouts/MainLayout";
import useSize from "@/utils/useSize";
import Markdown from "@/markdown/Markdown.jsx";

const About = () => {
    const [aboutMd, setAboutMd] = useState("Loading...");
    const screenSize = useSize();

    useEffect(() => {
        fetch("/about.md")
            .then((res) => res.text())
            .then((text) => setAboutMd(text));
    }, [screenSize]);

    const headerChildren = (
        <p>
            Welcome to the about page, where you can find more information about who I am,
            why I'm interested in CS, and what I can do. Feel free to reach out if you
            have any questions, and thank you for spending time getting to know me better!
        </p>
    );

    return (
        <MainLayout header headerChildren={headerChildren} title="About">
            <Tile title="About">
                <div className="markdown pt-2 md:pt-1">
                    <Markdown markdown={aboutMd} />
                </div>
            </Tile>
        </MainLayout>
    );
};

export default About;
