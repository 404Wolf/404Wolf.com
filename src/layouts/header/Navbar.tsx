import Navbutton from "@/layouts/header/Navbutton";
import Pulsate from "@/components/misc/pulsate";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ContactsPopup from "../../components/contacts/ContactsPopup";

interface NavbarProps {
    setBackgroundBlurred: (blurred: boolean) => void
}

const Navbar = ({ setBackgroundBlurred }: NavbarProps) => {
    const [contactsPopupShown, setContactsPopupShown] = useState(false);
    const { push } = useRouter();

    useEffect(() => {
        setBackgroundBlurred(contactsPopupShown);
    }, [contactsPopupShown]);

    return (
        <div className="pt-3">
            <ContactsPopup 
                open={ contactsPopupShown }
                setOpen={ setContactsPopupShown }
            />
            
            <div className="grid grid-cols-1 xs:grid-cols-3 text-center gap-3 mb-3">
                <Navbutton>About</Navbutton>

                <Navbutton onClick={() => setContactsPopupShown(true)}>
                    Contacts
                </Navbutton>
                
                <Navbutton onClick={() => push("/resume")}>Resume</Navbutton>
            </div>

            <div className="grid grid-cols-2 gap-3">
                <Pulsate period={ 825 } transition={ 400 }>
                    <Navbutton onClick={() => push("/projects")}>Projects</Navbutton>
                </Pulsate>

                <Pulsate period={ 825 } transition={ 400 }>
                    <Navbutton onClick={() => push("/blogs")}>Blogs</Navbutton>
                </Pulsate>
            </div>
        </div>
    );
}
 
export default Navbar;
