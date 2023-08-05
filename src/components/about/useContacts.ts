import { Contact } from "@prisma/client";
import { useEffect, useState } from "react";

const useContacts = (): Contact[] => {
    const [contacts, setContacts] = useState<Contact[]>([]);

    useEffect(() => {
        const fetchAbout = async () => {
            const response = await fetch('/api/contacts');
            const contacts = await response.json();
            setContacts(contacts);
        }
        fetchAbout();
    }, []);

    return contacts;
}
 
export default useContacts;