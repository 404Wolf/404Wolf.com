import Typewriter from "typewriter-effect";

const Greeter = () => {
    return (
        <div>
            <div className="md:absolute md:bg-gray-700 md:text-white md:text-center md:rounded-full md:p-3 md:w-[28rem] md:scale-110 md:-translate-y-[5.3rem] md:-translate-x-[2rem] border-slate-900">
                <Typewriter 
                    onInit={
                        (typewriter) => {
                            typewriter
                                .typeString("Hi! ")
                                .pauseFor(700)
                                .typeString("I'm Wolf Mermelstein")
                                .start()
                        }
                    }
                    options={
                        {
                            delay: 70, 
                            wrapperClassName: "text-4xl font-bold",
                            cursor: ""
                        }
                    }
                    skipAddStyles={ true }
                />
            </div>

            <h2 className="text-lg text-justify md:text-left mb-2 mt-2 md:mt-8 indent-10 leading-6">
                <p className="mb-2">
                    I'm a student in NYC with a passion for tinkering, coding, Ancient Latin, D&D, strategy board games, creating, designing, engineering, geeking, making, and figuring things out.
                </p>
                
                <p>
                    Information, projects, contacts, my resume, and more can be found on this website. If you have any questions, feel free to email me!
                </p>
            </h2>
        </div>
    );
}
 
export default Greeter;