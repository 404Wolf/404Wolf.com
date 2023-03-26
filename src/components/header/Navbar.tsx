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
            
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-4 text-center gap-3">
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
