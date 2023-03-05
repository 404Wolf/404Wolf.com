import Image from "next/Image";
import Navbar from "./Navbar";
import { useState } from "react";
import Greeter from "./Greeter";
import InlineButton from "../misc/InlineButton";

const profileImageMe = "/resources/profileMe.jpg"
const profileImageDog = "/resources/profileDog.jpg"

const Header = () => {
    const profileSize = 160
    const [ profileImage, setProfileImage ] = useState(profileImageMe)

    return (
        <div>
            <Image 
                onMouseEnter={(e) => setProfileImage(profileImageDog)}
                onMouseLeave={(e) => setProfileImage(profileImageMe)}
                priority
                src={ profileImage } 
                width={ profileSize } 
                height={ profileSize } 
                alt="Profile"
                className="mx-auto rounded-full md:rounded-[2.5rem] md:ml-4 m-4 md:m-0 border-[9.5px] border-gray-500 drop-shadow-sm md:float-right"
            />
            <div className="block mb-5 md:hidden text-center">
                <Greeter/>
            </div>
            <h2 className="text-lg text-center md:text-left indent-0 md:indent-8 leading-6 mb-4">
                <p className="mb-2">
                    I'm a <InlineButton to="https://bhsec.bard.edu/queens/">BHSEC</InlineButton> student in NYC with a passion for tinkering, coding, Ancient Latin, D&D, strategy board games, creating, designing, engineering, geeking, making, and figuring things out.
                </p>
                
                <p>
                    Information, projects, contacts, my resume, and more can be found on this website. If you have any questions, feel free to <InlineButton to="mailto:wolfmermelstein@gmail.com">email me!</InlineButton>
                </p>
            </h2>

            <Navbar/>
            
        </div>
    );
}
 
export default Header;