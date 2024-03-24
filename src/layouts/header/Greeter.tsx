"use client";

import { useEffect, useState } from "react";
import Typewriter from "typewriter-effect";

const Greeter = () => {
    const [ready, setReady] = useState(false);
    useEffect(() => {
        setReady(true);
    }, []);

    return (
        <div className="relative"> 
            <span className="text-transparent"> {"Hi! I'm Wolf Mermelstein"} </span>
            <span className="absolute left-0" style={{ whiteSpace: "nowrap" }}>
                <Typewriter
                    onInit={(typewriter) => {
                        typewriter
                            .typeString("Hi! ")
                            .pauseFor(700)
                            .typeString("I'm Wolf Mermelstein")
                            .start();
                    }}
                    options={{ delay: 70, cursor: "", autoStart: true }}
                />

                {!ready && <>&nbsp;</>}
            </span>
        </div>
    );
};

export default Greeter;
