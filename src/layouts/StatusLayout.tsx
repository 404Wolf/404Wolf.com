import Tile from "@/components/misc/Tiles/Tile";
import MainLayout from "./MainLayout";

interface StatusLayoutProps {
    name: string;
    children: React.ReactNode;
}

const StatusLayout = ({ name, children }: StatusLayoutProps) => {
    return (
        <MainLayout title={name} header={false}>
            <Tile>
                <h1 className="text-center text-3xl">{children}</h1>
            </Tile>
        </MainLayout>
    );
};

export default StatusLayout;
