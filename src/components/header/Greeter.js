import Typewriter from "typewriter-effect";

const Greeter = () => {
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
                    }
                }
                options={
                    {
                        delay: 25, 
                        wrapperClassName: "text-4xl md:text-7xl text-blue",
                        cursor: ""
                    }
                }
                skipAddStyles={ true }
            />

                <h2 className="text-xl text-justify md:text-left mt-2 md:mt-0">
                    I'm a student in NYC with a passion for tinkering, coding, Ancient Latin, D&D, strategy board games, creating, designing, engineering, geeking, making, and figuring things out.
                </h2>
        </div>
    );
}
 
export default Greeter;