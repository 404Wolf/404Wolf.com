import Popup from "reactjs-popup";

interface ModalProps {
    setBlurPage: (blur: boolean) => void;
    setOpen: (open: boolean) => void;
    open: boolean;
    children: React.ReactNode;
}

const Modal = ({ setBlurPage, open, setOpen, children }: ModalProps) => {
    return (
        <Popup
            open={open}
            onClose={() => {setOpen(false); setOpen(false)}}
            closeOnDocumentClick
            modal
        >
            { children }
        </Popup>
    );
}
 
export default Modal;