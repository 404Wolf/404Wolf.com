import Contacts from "@/components/contacts/Contacts";
import useAbout from "@/hooks/useAbout";
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
    const about = useAbout()

    return (
        <Modal
            open={ open }
            setOpen={ setOpen }
            onClose={ () => setBackdropBlur(false) }
        >
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 bg-slate-500 p-6 pt-8 rounded-2xl drop-shadow-5xl-c">
                <Tile title="Contacts" className="sm:border-4 sm:border-slate-700" extraPadding={4}>
                    <div className="pt-1">
                        <Contacts/>
                    </div>
                </Tile>
            </div>
        </Modal>
    )
}
 
export default ContactsPopup;
