"use client";

import Contact, {
  ContactProps as ContactType,
} from "@/components/contacts/Contact";
import useContacts from "../about/useContacts";
import useAbout from "../about/useAbout";

const Contacts = () => {
  const contacts = useContacts();
  const about = useAbout();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {about && (
        <>
          <Contact
            name="Email"
            username={about.email}
            url={`mailto:${about.email}`}
            icon="mail"
            key={-1}
            at={false}
          />
          <Contact
            name="Phone"
            username={about.phone.display}
            url={`tel:${about.phone.link}`}
            icon="phone"
            key={-2}
            at={false}
          />
        </>
      )}
      {contacts.map((contact: ContactType, index) => {
        return contact.name != "Instagram" && (
          <>
            <Contact
              name={contact.name}
              username={contact.username}
              url={contact.link}
              icon={contact.name}
              at={contact.at ? contact.at : false}
              key={index}
            />
          </>
        );
      })}
    </div>
  );
};

export default Contacts;
