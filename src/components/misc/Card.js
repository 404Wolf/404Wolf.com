import { useState } from "react";
import Typewriter from "typewriter-effect";

const Card = ( {title, className, children} ) => {
    const headerStyle = "text-center absolute -translate-x-[.9rem] -translate-y-[1rem] bg-gray-700 text-white text-lg p-1 px-2 rounded-full w-32";

    return (
        <div className="h-full relative">
            {title && <div className={ headerStyle }>
                <h2 className="text-2xl text-bold">
                <Typewriter 
                    onInit={
                        (typewriter) => {
                            typewriter
                            .typeString(title)
                            .pauseFor(1000)
                            .start()
                        }
                    }
                    options={
                        {
                            delay: 200, 
                            cursor: " "
                        }
                    }
                    skipAddStyles={ true }
                />
                </h2>
            </div>}
            <div className={"p-5 pt-8 bg-slate-300 rounded-2xl h-full "+className}>
                { children }
            </div>
        </div>
    );
}
 
export default Card;