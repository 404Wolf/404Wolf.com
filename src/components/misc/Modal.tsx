import Image from "next/image";
import Popup from "reactjs-popup";

interface ModalProps {
    open: boolean;
    onOpen?: () => void;
    setOpen: (open: boolean) => void;
    onClose?: () => void;
    children: React.ReactNode;
    className?: string;
}

const Modal = ({ open, onOpen, setOpen, onClose, children, className }: ModalProps) => {
    return (
        <Popup
            open={ open }
            onClose={() => {setOpen(false); onClose && onClose()}}
            closeOnDocumentClick
            modal
        >
            <div className={`${className ? className : ""} relative`}>
                <a className="absolute w-7 h-7 right-7 top-7 cursor-pointer" onClick={() => setOpen(false)}>
                    <Image 
                        src="/icons/close.svg" 
                        className="z-50 bg-slate-400 rounded-full translate-x-2 -translate-y-2 drop-shadow-xl hover:brightness-90 hover:scale-105 transition-all duration-200 ease-in-out"
                        alt="close" 
                        fill
                    />
                </a>
                { children }
            </div>
        </Popup>
    );
}
 
export default Modal;