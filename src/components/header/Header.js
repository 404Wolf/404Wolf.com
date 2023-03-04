import Image from "next/Image";
import Contacts from "../contacts/Contacts";
import Greeter from "./Greeter"
import Navbar from "./Navbar";
import profileImageMe from "@/resources/profileMe.jpg"
import profileImageDog from "@/resources/profileDog.jpg"
import { useState } from "react";

const Header = () => {
    const profileSize = 175
    const [ profileImage, setProfileImage ] = useState(profileImageMe)

    return (
        <div>
            <Image 
                onMouseEnter={(e) => setProfileImage(profileImageDog)}
                onMouseLeave={(e) => setProfileImage(profileImageMe)}
                src={ profileImage } 
                width={ profileSize } 
                height={ profileSize } 
                alt="Profile"
                className="mx-auto mb-2 lg:mb-0 md:float-right rounded-full md:ml-4 border-8 border-slate-700 md:-translate-y-4"
            />

            <Greeter/>
            
            <div className="flex-col md:flex-row flex items-center justify-start gap-5 lg:gap-[5rem]">
                <Navbar/>
                <Contacts/>
            </div>
        </div>
    );
}
 
export default Header;