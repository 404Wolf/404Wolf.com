import ContactIcon from "./ContactIcon";

interface ContactProps {
    name: string;
    username: string;
    url: string;
    icon: string | null;
}

const Contact = ({ name, username, url, icon }: ContactProps) => {
    return (
        <a href={ url } target="_blank" rel="noopener noreferrer" className="duration-150 hover:scale-105 hover:drop-shadow-sm mr-auto">
            <div className="relative -mr-4">
                <div className="absolute text-xs bottom-0 left-0 translate-y-2 bg-slate-600 rounded-full px-1 text-white z-30">
                    { name }
                </div>
                
                <div className="flex items-center">
                    <div className="bg-slate-500 p-1 rounded-3xl z-20">
                        <ContactIcon src={ `/icons/${name}.svg` } alt={ `${username} - ${name}` }/>
                    </div>

                    <div className="text-md bg-slate-400 w-[11.5rem] pl-7 pr-2 py-1 rounded-full -translate-x-6 z-0">
                        <span className="text-xl font-bold">@</span>
                        { username }
                    </div>
                </div>
            </div>
        </a>
    );
}
 
export default Contact;