import Image from "next/Image";
import Navbar from "./Navbar";
import { useState } from "react";
import Greeter from "./Greeter";
import InlineButton from "../misc/InlineButton";

const profileImageMe = "/resources/profileMe.jpg"
const profileImageDog = "/resources/profileDog.jpg"

const Header = () => {
    const profileSize = 180
    const [ profileImage, setProfileImage ] = useState(profileImageMe)

    return (
        <div>
            <div className="md:absolute md:bg-gray-700 md:text-white md:rounded-full md:p-4 md:w-[28rem] md:scale-110 md:-translate-y-[3.8rem] md:-translate-x-[2.6rem] border-slate-900">
                <Greeter/>
            </div>

            <Image 
                    onMouseEnter={(e) => setProfileImage(profileImageDog)}
                    onMouseLeave={(e) => setProfileImage(profileImageMe)}
                    priority
                    src={ profileImage } 
                    width={ profileSize } 
                    height={ profileSize } 
                    alt="Profile"
                    className="mx-auto rounded-full md:ml-4 border-[9.5px] border-slate-600 drop-shadow-md float-right"
                />
            <h2 className="text-lg text-center md:text-left mb-6 pt-8 md:mt-1 indent-0 md:indent-8 leading-6">
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