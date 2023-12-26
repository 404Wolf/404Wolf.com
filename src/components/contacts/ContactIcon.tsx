import Image from "next/image";

interface ContactIconProps {
    src: string;
    alt: string;
}

const ContactIcon = ({src, alt}: ContactIconProps) => {
    return (
        <div className="p-[4px] rounded-xl">
            <div className="relative w-12 h-12">
                <Image
                    priority
                    alt={alt}
                    src={src}
                    fill
                />
            </div>
        </div>
    );
}

export default ContactIcon;
