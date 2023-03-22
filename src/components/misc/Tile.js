import Typewriter from "typewriter-effect";

const Tile = ( {title, className, children} ) => {
    const headerStyle = "text-center absolute -translate-x-[.9rem] -translate-y-[1rem] bg-gray-700 text-white text-lg p-1 rounded-full w-24 sm:w-32";

    return (
        <div className="h-full relative">
            {title && <div className={ headerStyle }>
                <h2 className="text-xl sm:text-2xl text-bold">
                    <Typewriter 
                        onInit={(typewriter) => {typewriter.typeString(title).start()}}
                        options={{delay: 100, cursor: " "}}
                        skipAddStyles={ true }
                    />
                </h2>
            </div>}
            <div className={`p-4 md:p-5 ${title ? "pt-8" : "pt-0"} bg-slate-300 rounded-2xl h-full ${className}`}>
                { children }
            </div>
        </div>
    );
}
 
export default Tile;