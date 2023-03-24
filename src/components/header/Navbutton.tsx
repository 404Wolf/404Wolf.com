interface NavbuttonProps {
    onClick?: () => void;
    children: React.ReactNode;
}

const Navbutton = ({ children, onClick }: NavbuttonProps) => {
    return (
        <button onClick={ onClick } className="bg-mid-blue-300 drop-shadow-lg text-white text-md sm:text-lg md:text-xl px-1 md:px-4 py-1 rounded-xl w-full duration-150 hover:brightness-90 hover:-translate-y-2">
            { children }
        </button>
    );
}
 
export default Navbutton;
