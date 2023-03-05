import Typewriter from "typewriter-effect";

const Navbutton = ({ children, onClick }) => {
    return (
        <button onClick={ onClick } className="bg-mid-blue drop-shadow-lg text-white text-lg md:text-xl px-3 md:px-4 py-2 rounded-xl w-full md:w-32 xl:w-48 duration-150 hover:brightness-90 hover:-translate-y-2">
            { children }
        </button>
    );
}
 
export default Navbutton;