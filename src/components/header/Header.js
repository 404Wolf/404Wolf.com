import Image from "next/image";
import Contacts from "../contacts/Contacts";
import Greeter from "./Greeter"
import Navbar from "./Navbar";
import profileImage from "@/resources/profileMe.jpg"

const Header = () => {
    const profileSize = 180

    return (
        <div>
            <Image 
                src={ profileImage } 
                width={ profileSize } 
                height={ profileSize } 
                className="float-right rounded-full border-[6px] border-black"
            />

            <Greeter/>
            
            <div className="flex py-4 items-center gap-10">
                <Navbar/>
                <Contacts/>
            </div>
        </div>
    );
}
 
export default Header;