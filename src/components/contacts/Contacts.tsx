import Contact from "@/components/contacts/Contact";
import useAbout from "@/components/about/useAbout";
//flex sm:flex-col items-center gap-3 pt-2
const Contacts = () => {
    const about = useAbout()

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {about.contacts.map(
                (contact, index) => {
                    return (
                        <div>
                            <Contact
                                name={ contact.name }
                                username={ contact.username }
                                url={ contact.link }
                                icon={ contact.name }
                                at={ contact.at ? contact.at : false }
                            />
                        </div>
                    )
                }
            )}
        </div>
    );
}
 
export default Contacts;
