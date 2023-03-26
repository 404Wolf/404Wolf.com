import Navbutton from "@/components/header/Navbutton";
import { useRouter } from "next/router";
import { useState } from "react";
import ContactsPopup from "../contacts/ContactsPopup";

const Navbar = () => {
    const [contactsPopupShown, setContactsPopupShown] = useState(false);
    const { push } = useRouter();

    return (
        <div className="pt-3">
            <ContactsPopup 
                open={ contactsPopupShown }
                setOpen={ setContactsPopupShown }
            />
            
            <div className="flex flex-row justify-start text-center gap-3">
                <Navbutton>About</Navbutton>
                    
                <Navbutton onClick={() => setContactsPopupShown(true)}>
                    Contacts
                </Navbutton>

                <Navbutton onClick={() => push("/resume")}>Resume</Navbutton>

                <Navbutton onClick={() => push("/projects")}>Projects</Navbutton>
            </div>
        </div>
    );
}
 
export default Navbar;
