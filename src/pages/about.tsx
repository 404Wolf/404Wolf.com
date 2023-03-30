import Tile from "@/components/misc/Tile";
import MainLayout from "@/layouts/MainLayout";
import Link from "next/link";

const About = () => {
    return (
        <MainLayout header="About" title="About me">
            <Tile>
                Page under construction.
                <br/>
                For now, feel free to check out my <Link className="underline text-blue-700" href="/resume">resume</Link> to learn more.
            </Tile>
        </MainLayout>
    );
}
 
export default About;