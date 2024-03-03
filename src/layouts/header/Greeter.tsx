"use client";

import { useEffect, useState } from "react";
import Typewriter from "typewriter-effect";

const Greeter = () => {
    const [ready, setReady] = useState(false);
    useEffect(() => {
        setReady(true);
    }, []);

    return (
        <span>
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
    );
};

export default Greeter;
