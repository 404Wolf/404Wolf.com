import Tag from "../misc/Tag";
import ContactIcon from "@/components/contacts/ContactIcon";

interface ContactProps {
    name: string;
    username: string;
    url: string;
    icon: string | null;
    at?: boolean;
    textSize?: string;
    key: number;
}

const Contact = ({
    name,
    username,
    url,
    icon,
    at = true,
    textSize = "md",
    key,
}: ContactProps) => {
    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="duration-150 hover:scale-105 hover:drop-shadow-sm mr-auto"
        >
            <div className="relative -mr-4">
                <Tag position="bl">{name}</Tag>

                <div className="flex items-center">
                    <div className="bg-slate-400 p-[.35rem] rounded-3xl z-20">
                        {name && (
                            <ContactIcon
                                src={`/icons/${name.toLowerCase()}.svg`}
                                alt={`${username} - ${name}`}
                            />
                        )}
                    </div>

                    <div
                        className={`text-${textSize} bg-slate-200 w-full pl-7 pr-2 py-1 rounded-full -translate-x-6 z-0`}
                    >
                        <span className="text-xl font-bold">{at ? "@" : " "}</span>
                        {username}
                    </div>
                </div>
            </div>
        </a>
    );
};

export default Contact;
