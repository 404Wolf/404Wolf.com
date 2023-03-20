import Typewriter from "typewriter-effect";

const Navbutton = ({ children, onClick }) => {
    return (
        <button onClick={ onClick } className="bg-mid-blue drop-shadow-lg text-white text-md text-lg md:text-xl px-1 md:px-4 py-1 rounded-xl w-full duration-150 hover:brightness-90 hover:-translate-y-2">
            { children }
        </button>
    );
}
 
export default Navbutton;