import Tile from "@/components/misc/Tiles/Tile";
import MainLayout from "@/layouts/MainLayout";
import useSize from "@/utils/useSize";
import EditorArea from "@/components/editor/Editor";
import s3 from "@/utils/aws";

export const getServerSideProps = async () => {
    const defaultAbout = await s3.getResource(process.env.NEXT_PUBLIC_EXTENDED_ABOUT_OBJECT_NAME as string, "utf-8");

    return {
        props: {defaultAbout: defaultAbout},
    };
};

interface AboutProps {
    defaultAbout: string;
}

const About = ({defaultAbout}: AboutProps) => {
    const screenSize = useSize();

    const headerChildren = (
        <p>
            Welcome to the about page, where you can find more information about who I am, why I'm
            interested in CS, and what I can do. Feel free to reach out if you have any questions,
            and thank you for spending time getting to know me better!
        </p>
    );

    return (
        <MainLayout header headerChildren={headerChildren} title="About">
            <Tile title="About">
                <div className="markdown pt-2 md:pt-1">
                    <EditorArea
                        startingText={defaultAbout}
                        objectName={process.env.NEXT_PUBLIC_EXTENDED_ABOUT_OBJECT_NAME as string}
                        resourceMap={{profileMe: "/resources/profileMe.webp"}}
                    />
                </div>
            </Tile>
        </MainLayout>
    );
};

export default About;
