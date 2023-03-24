import Navbutton from "@/components/header/Navbutton";
import { useState } from "react";
import ContactsPopup from "../contacts/ContactsPopup";

interface NavbarProps {
    setBlurPage: (blur: boolean) => void
}

const Navbar = ({ setBlurPage }: NavbarProps) => {
    const [contactsPopupShown, setContactsPopupShown] = useState(false);

    return (
        <>
            <ContactsPopup 
                open={ contactsPopupShown }
                setOpen={ setContactsPopupShown }
                setBlurPage={ setBlurPage }
            />
            
            <div className="flex flex-row justify-start text-center gap-3">
                <Navbutton>About Me</Navbutton>
                    
                <Navbutton onClick={() => setContactsPopupShown(true)}>
                    Contacts
                </Navbutton>

                <Navbutton>Resume</Navbutton>
            </div>
        </>
    );
}
 
export default Navbar;
