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
                        wrapperClassName: "text-7xl text-blue",
                        cursor: ""
                    }
                }
                skipAddStyles={ true }
            />

                <h2 className="text-xl">
                    I'm a student in NYC with a passion for coding and figuring things out.
                </h2>
        </div>
    );
}
 
export default Greeter;