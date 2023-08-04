import Contact from "@/components/contacts/Contact";
import useContacts from "../about/useContacts";

const Contacts = () => {
    const contacts = useContacts()

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {contacts.map((contact, index) => {
                return (
                    <div>
                        <Contact
                            name={contact.name}
                            username={contact.username}
                            url={contact.link}
                            icon={contact.name}
                            at={contact.at ? contact.at : false}
                            key={index}
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default Contacts;
