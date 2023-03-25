import Tag from "../misc/Tag";
import ContactIcon from "./ContactIcon";

interface ContactProps {
    name: string;
    username: string;
    url: string;
    icon: string | null;
    at?: boolean;
}

const Contact = ({ name, username, url, icon, at=true }: ContactProps) => {
    return (
        <a href={ url } target="_blank" rel="noopener noreferrer" className="duration-150 hover:scale-105 hover:drop-shadow-sm mr-auto">
            <div className="relative -mr-4">
                <Tag>
                    { name }
                </Tag>
                
                <div className="flex items-center">
                    <div className="bg-slate-500 p-1 rounded-3xl z-20">
                        <ContactIcon src={ `/icons/${name}.svg` } alt={ `${username} - ${name}` }/>
                    </div>

                    <div className="text-md bg-slate-400 w-[11.5rem] pl-7 pr-2 py-1 rounded-full -translate-x-6 z-0">
                        <span className="text-xl font-bold">{at ? '@' : ' '}</span>
                        { username }
                    </div>
                </div>
            </div>
        </a>
    );
}
 
export default Contact;