import Tile from "@/components/misc/Tile";
import MainLayout from "./MainLayout";

const Unauthorized = () => {
    return (
        <MainLayout title="Unauthorized" header={false}>
            <Tile>
                <h1 className="text-center text-3xl">You are not allowed to access this page.</h1>
            </Tile>
        </MainLayout>
    );
};

export default Unauthorized;
