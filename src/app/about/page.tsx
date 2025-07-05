import Tile from "@/components/misc/Tiles/Tile";
import MainLayout from "@/layouts/MainLayout";
import EditorArea from "@/components/editor/Editor";
import s3 from "@/utils/aws";

async function getDefaultAbout(): Promise<string> {
  const resp = await s3.getResource(
    process.env.NEXT_PUBLIC_EXTENDED_ABOUT_OBJECT_NAME!,
    "utf-8",
  );
  return resp?.toString() || "";
}

const About = async () => {
  const headerChildren = (
    <p className="text-[17px] sm:text-[1.4em]">
      Welcome to my brief bio page! Feel free to reach out if you have any
      questions, and thank you for spending time getting to know me better!
    </p>
  );

  return (
    <MainLayout header headerChildren={headerChildren} title="About">
      <Tile title="About">
        <div className="markdown pt-2 md:pt-1">
          <EditorArea
            addContents={false}
            startingText={await getDefaultAbout()}
            objectName={process.env.NEXT_PUBLIC_EXTENDED_ABOUT_OBJECT_NAME!}
            resourceMap={{ profileMe: "/resources/profileMe.webp" }}
          />
        </div>
      </Tile>
    </MainLayout>
  );
};

export default About;
