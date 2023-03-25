import Contacts from "@/components/contacts/Contacts";
import { useEffect } from "react";
import Modal from "../misc/Modal";
import Tile from "../misc/Tile";

interface ContactsPopupProps {
    open: boolean
    setOpen: (open: boolean) => void
    setBackdropBlur: (blur: boolean) => void
}

const ContactsPopup = ({ open, setOpen, setBackdropBlur }: ContactsPopupProps) => {
    useEffect(() => {setBackdropBlur(open)}, [open])

    return (
        <Modal
            open={ open }
            setOpen={ setOpen }
            onClose={ () => setBackdropBlur(false) }
        >
            <>
                <div className="bg-slate-500 p-6 pt-8 rounded-2xl drop-shadow-5xl-c">
                    <Tile title="Contacts" className="bg-slate-300 p-3 rounded-2xl">
                        <Contacts/>
                    </Tile>
                </div>
            </>
        </Modal>
    )
}
 
export default ContactsPopup;