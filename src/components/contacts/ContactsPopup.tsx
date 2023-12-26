import Contacts from "@/components/contacts/Contacts";
import Modal from "../misc/Modal";
import Tile from "../misc/Tiles/Tile";

interface ContactsPopupProps {
    open: boolean
    setOpen: (open: boolean) => void
}

const ContactsPopup = ({open, setOpen}: ContactsPopupProps) => {
    return (
        <Modal
            open={open}
            setOpen={setOpen}
            onClose={() => setOpen(false)}
        >
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 p-6 pt-8 rounded-2xl drop-shadow-5xl-c-white">
                <Tile title="Contacts" className="border-4 border-slate-700" extraPadding={4}>
                    <div className="pt-1">
                        <Contacts/>
                    </div>
                </Tile>
            </div>
        </Modal>
    )
}

export default ContactsPopup;
