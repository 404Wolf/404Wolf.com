import Navbar from "@/layouts/header/Navbar";

interface HeaderProps {
    setBackgroundBlurred: (blurred: boolean) => void;
    children?: React.ReactNode;
}

const Header = ({ setBackgroundBlurred, children }: HeaderProps) => {
    return (
        <div>
            <div className="flex flex-col gap-5 justify-between">
                <div className="indent-4 md:indent-6 lg:indent-8">{children}</div>
                <Navbar setBackgroundBlurred={setBackgroundBlurred} />
            </div>
        </div>
    );
};

export default Header;
