import Navbutton from "@/components/header/Navbutton";

const Navbar = () => {
    return (
        <div className="flex flex-row justify-start text-center gap-3">
            <Navbutton>About Me</Navbutton>
            <Navbutton>Contacts</Navbutton>
            <Navbutton>Resume</Navbutton>
        </div>
    );
}
 
export default Navbar;
