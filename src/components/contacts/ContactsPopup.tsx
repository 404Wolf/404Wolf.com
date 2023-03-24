import Contacts from "@/components/contacts/contacts";
import { useEffect } from "react";
import Modal from "../misc/Modal";

interface ContactsPopupProps {
    open: boolean
    setOpen: (open: boolean) => void
    setBlurPage: (blurPage: boolean) => void
}

const ContactsPopup = ({ open, setOpen, setBlurPage }: ContactsPopupProps) => {
    useEffect(() => setBlurPage(open), [open])

    return (
        <Modal
            open={ open }
            setOpen={ setOpen }
            setBlurPage={ setBlurPage }
        >
            <div className="bg-slate-600 p-5 rounded-2xl">
                <div className="bg-slate-300 p-3 rounded-2xl">
                    <h1>Contacts</h1>
                    <Contacts/>
                </div>
            </div>
        </Modal>
    )
}
 
export default ContactsPopup;