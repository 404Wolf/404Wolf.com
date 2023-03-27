import Navbar from "@/layouts/header/Navbar";

interface HeaderProps {
    setBackgroundBlurred: (blurred: boolean) => void;
    children?: React.ReactNode
}

const Header = ({ setBackgroundBlurred, children }: HeaderProps) => {
    
    

    

    return (
        <div>
            <div className="flex flex-col gap-5 justify-between">
                

                {children}

                <Navbar setBackgroundBlurred={setBackgroundBlurred} />
            </div>
        </div>
    );
}

export default Header;
