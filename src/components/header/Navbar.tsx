import Navbutton from "@/components/header/Navbutton";
import { useRouter } from "next/navigation";

const Navbar = () => {
    const { push } = useRouter();

    return (
        <div className="flex flex-row justify-start text-center gap-3">
            <Navbutton>About Me</Navbutton>
            <Navbutton>Contacts</Navbutton>
            <Navbutton onClick={() => push("/resume")}>Resume</Navbutton>
        </div>
    );
}
 
export default Navbar;
