import MainLayout from "@/components/layouts/MainLayout";
import Tile from "@/components/misc/Tile";

const Resume = () => {
    return (
        <MainLayout header="Resumé">
            <Tile className="h-screen">
                <iframe src="/resume.pdf" className="w-full h-full rounded-xl"/>
            </Tile>
        </MainLayout>
    );
}
 
export default Resume;