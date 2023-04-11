import { useState, useEffect } from "react";
import InlineButton from "@/components/misc/InlineButton";
import Tile from "@/components/misc/Tile";
import MainLayout from "@/layouts/MainLayout";
import Image from "next/image";
import Link from "next/link";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { parseMd } from "@/utils/parseMd";
import useSize from "@/utils/useSize";
import rehypeRaw from "rehype-raw";

const About = () => {
    const [aboutMd, setAboutMd] = useState("Loading...");
    const screenSize = useSize();

    useEffect(() => {
        fetch("/about.md")
            .then((res) => res.text())
            .then((text) => {
                setAboutMd(parseMd(text, screenSize[0]));
            });
    }, []);

    const headerChildren = (
        <p>
            Welcome to the about page, where you can find more information about who
            I am, why I'm interested in CS, and what I can do. Feel free to reach
            out if you have any questions, and thank you for spending time getting
            to know me better!
        </p>
    );

    return (
        <MainLayout header headerChildren={headerChildren} title="About">
            <Tile title="About">
                <div className="markdown pt-2 md:pt-0">
                    <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                        {aboutMd}
                    </ReactMarkdown>
                </div>
            </Tile>
        </MainLayout>
    );
};

export default About;
