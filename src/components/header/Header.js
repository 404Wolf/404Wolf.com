import Image from "next/image";
import Contacts from "../contacts/Contacts";
import Greeter from "./Greeter"
import Navbar from "./Navbar";
import profileImage from "@/resources/profileMe.jpg"

const Header = () => {
    const profileSize = 190

    return (
        <div>
            <Image 
                src={ profileImage } 
                width={ profileSize } 
                height={ profileSize } 
                className="float-right rounded-full"
            />

            <Greeter/>
            
            <div className="pt-5">
                <Navbar/>
            </div>

            <div className="py-2">
                <Contacts/>
            </div>
        </div>
    );
}
 
export default Header;