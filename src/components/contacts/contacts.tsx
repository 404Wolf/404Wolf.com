import Contact from "@/components/contacts/contact";
import useAbout from "@/hooks/useAbout";

const Contacts = () => {
    const about = useAbout()

    return (
        <div className="flex flex-col items-center gap-4 pt-2">
            {about.contacts.map(
                (contact, index) => {
                    return (
                        <Contact
                            name={ contact.name }
                            username={ contact.username }
                            url={ contact.link }
                            icon={ contact.name }
                            at={ contact.at ? contact.at : false }
                        />
                    )
                }
            )}
        </div>
    );
}
 
export default Contacts;
