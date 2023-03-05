import Navbutton from "./Navbutton";

const Navbar = () => {
    return (
        <div className="flex flex-col sm:flex-row justify-start text-center gap-2 md:gap-[3%]">
            <Navbutton>About Me</Navbutton>
            <Navbutton>Contacts</Navbutton>
            <Navbutton>Resume</Navbutton>
        </div>
    );
}
 
export default Navbar;