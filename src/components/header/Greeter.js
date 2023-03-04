import { useState } from "react";
import Typewriter from "typewriter-effect";

const Greeter = () => {
    const [ showAboutMeText, setShowAboutMeText ] = useState(false)

    return (
        <div>
            <Typewriter 
                onInit={
                    (typewriter) => {
                        typewriter
                            .typeString("Hi! ")
                            .pauseFor(300)
                            .typeString("I'm Wolf Mermelstein")
                            .start()
                            .callFunction(() => setShowAboutMeText(true))
                    }
                }
                options={
                    {
                        delay: 25, 
                        wrapperClassName: "text-7xl text-blue",
                        cursor: ""
                    }
                }
                skipAddStyles={true}
            />

            {showAboutMeText ? <Typewriter
                onInit={
                    (typewriter) => {
                        typewriter
                            .typeString("I'm a student in NYC with a passion for coding and figuring things out.")
                            .start()
                    }
                }
                options={
                    {
                        delay: 10, 
                        wrapperClassName: "text-xl",
                        cursor: ""
                    }
                }
            /> : <h2 className="text-xl">&nbsp;</h2>
            }
        </div>
    );
}
 
export default Greeter;