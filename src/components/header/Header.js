import Image from "next/image";
import Navbar from "./Navbar";
import { useState } from "react";
import InlineButton from "../misc/InlineButton";

const profileImageMe = "/resources/profileMe.webp"
const profileImageDog = "/resources/profileDog.webp"

const Header = () => {
    const [ profileImageSrc, setProfileImageSrc ] = useState(profileImageMe)
    const profileImage = (
        <Image 
            onMouseEnter={(e) => setProfileImageSrc(profileImageDog)}
            onMouseLeave={(e) => setProfileImageSrc(profileImageMe)}
            priority
            src={ profileImageSrc } 
            width={ 400 } 
            height={ 400 } 
            alt="Profile"
            className="rounded-full sm:rounded-[2.5rem] border-[9.5px] border-gray-500"
        />
    )
        
    return (
        <div>
            <div className="sm:flex sm:justify-between">
                <div className="flex flex-col gap-5 justify-between">
                    <div className="block sm:hidden mx-auto -m-2">
                        { profileImage }
                    </div>

                    <h2 className="text-lg text-center sm:text-left indent-0 sm:indent-8 leading-6 mt-1 my-auto">
                        <p className="mb-2">
                            I'm a <InlineButton externalTo="https://bhsec.bard.edu/queens/">BHSEC</InlineButton> student in NYC with a passion for tinkering, coding, Ancient Latin, D&D, strategy board games, creating, designing, engineering, geeking, making, and figuring things out.
                        </p>
                        <p>
                            Information, projects, contacts, my resume, and more can be found on this website. If you have any questions, feel free to <InlineButton externalTo="mailto:wolfmermelstein@gmail.com">email me!</InlineButton>
                        </p>
                    </h2>

                    <Navbar/>
                </div>

                <div className="hidden sm:block mx-auto sm:scale-[105%] my-1 ml-5">
                    { profileImage }
                </div>

            </div>
        </div>
    );
}
 
export default Header;