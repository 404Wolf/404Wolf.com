import Image from "next/image";

interface ContactProps {
    name: string;
    username: string;
    url: string;
    icon: string | null;
}

const Contact = ({ name, username, url, icon }: ContactProps) => {
    const alt = `${username} (${name})`

    return (
        <div className="p-1 rounded-xl">
            <div className="duration-150 hover:scale-110 relative w-16 h-16">
                <a href={ url } title={ alt } target="_blank" rel="noreferrer noopener">
                    {icon && <Image
                        priority 
                        alt={ alt }
                        src={ icon } 
                        fill
                    />}
                </a>
            </div>
        </div>
    );
}
 
export default Contact;
