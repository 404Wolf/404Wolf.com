import Contact from "@/components/contacts/Contact";
import useAbout from "@/hooks/useAbout";

const Contacts = () => {
    const about = useAbout()

    return (
        <div className="flex flex-col items-center gap-4 pt-2">
            {about.contacts.map(
                (contact, index) => (
                    <Contact
                        name={ contact.name }
                        username={ contact.username }
                        url={ contact.link }
                        icon={ contact.name }
                    />
                )
            )}
        </div>
    );
}
 
export default Contacts;
