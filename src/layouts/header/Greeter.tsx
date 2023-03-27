import Typewriter from "typewriter-effect";

const Greeter = () => {
    return (
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
            options={{delay: 70, cursor: ""}}
        />
    );
}
 
export default Greeter;
