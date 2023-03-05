import Image from "next/Image";
import Navbar from "./Navbar";
import { useState } from "react";
import Greeter from "./Greeter";
import InlineButton from "../misc/InlineButton";

const profileImageMe = "/resources/profileMe.jpg"
const profileImageDog = "/resources/profileDog.jpg"

const Header = () => {
    const profileSize = 190
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
                className="mx-auto rounded-[2.5rem] md:ml-4 border-[9.5px] border-gray-500 drop-shadow-sm float-right"
            />
            <h2 className="text-lg text-center md:text-left mb-5 indent-0 md:indent-8 leading-6">
                <p className="mb-2">
                    I'm a BHSEC student in NYC with a passion for tinkering, coding, Ancient Latin, D&D, strategy board games, creating, designing, engineering, geeking, making, and figuring things out.
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