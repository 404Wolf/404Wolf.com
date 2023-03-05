import Image from "next/Image";
import Navbar from "./Navbar";
import { useState } from "react";
import Greeter from "./Greeter";
import InlineButton from "../misc/InlineButton";

const profileImageMe = "/resources/profileMe.jpg"
const profileImageDog = "/resources/profileDog.jpg"

const Header = () => {
    const profileSize = 160
    const [ profileImageSrc, setProfileImageSrc ] = useState(profileImageMe)
    const profileImage = (
        <Image 
            onMouseEnter={(e) => setProfileImageSrc(profileImageDog)}
            onMouseLeave={(e) => setProfileImageSrc(profileImageMe)}
            priority
            src={ profileImageSrc } 
            width={ profileSize } 
            height={ profileSize } 
            alt="Profile"
            className="rounded-full sm:rounded-[2.5rem] border-[9.5px] border-gray-500"
        />
    )

    return (
        <div>
            <div className="sm:flex sm:justify-between">
                <div className="flex flex-col gap-5 justify-between">
                    <div className="block sm:hidden mx-auto -m-2 scale-[105%]">
                        { profileImage }
                    </div>

                    <div className="block sm:hidden text-center text-3xl">
                        <Greeter/>
                    </div>

                    <h2 className="text-lg text-center sm:text-left indent-0 sm:indent-8 leading-6 my-auto">
                        <p className="mb-2">
                            I'm a <InlineButton externalTo="https://bhsec.bard.edu/queens/">BHSEC</InlineButton> student in NYC with a passion for tinkering, coding, Ancient Latin, D&D, strategy board games, creating, designing, engineering, geeking, making, and figuring things out.
                        </p>
                        <p>
                            Information, projects, contacts, my resume, and more can be found on this website. If you have any questions, feel free to <InlineButton externalTo="mailto:wolfmermelstein@gmail.com">email me!</InlineButton>
                        </p>
                    </h2>

                    <Navbar/>
                </div>

                <div className="flex sm:flex-col sm:gap-5 justify-between">
                    <div className="hidden sm:block mx-auto scale-[105%] my-1">
                        { profileImage }
                    </div>

                    <div className="bg-[#A3b4cb] p-2 rounded-xl flex-col hidden sm:flex">
                        <InlineButton background={false} externalTo="mailto:caffeinate@msn.com">
                            Caffeinate@msn.com
                        </InlineButton>
                        <InlineButton background={false} externalTo="tel:+10202657180">
                            (929)265-7180
                        </InlineButton>
                    </div>
                </div>

            </div>
            
        </div>
    );
}
 
export default Header;