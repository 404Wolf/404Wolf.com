import Typewriter from "typewriter-effect";

const Tile = ( {title, className, children, direction="left" } ) => {
    return (
        <div className="h-full relative">
            {title && <div className={ `text-center absolute -translate-y-[1.15rem] ${direction == "left" ? "-translate-x-[.9rem]": "translate-x-[.9rem] right-0" } bg-gray-700 text-white text-lg p-[.15rem] rounded-full w-24 sm:w-32 z-50` }>
                <h2 className="text-xl sm:text-2xl text-bold">
                    <Typewriter 
                        onInit={(typewriter) => {typewriter.typeString(title).start()}}
                        options={{delay: 100, cursor: " "}}
                        skipAddStyles={ true }
                    />
                </h2>
            </div>}
            <div className={`p-3 md:p-5 bg-slate-300 rounded-2xl h-full ${className}`}>
                { children }
            </div>
        </div>
    );
}
 
export default Tile;