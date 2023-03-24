import MainLayout from "@/components/layouts/MainLayout";
import Tile from "@/components/misc/Tile";
import { useEffect, useState } from "react";

const Resume = () => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const setup = () => setNumPages(numPages);

    return (
        <MainLayout header="Resumé">
            <Tile className="h-screen">
                <iframe src="/resume.pdf" className="w-full h-full rounded-xl"/>
            </Tile>
        </MainLayout>
    );
}
 
export default Resume;