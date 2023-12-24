import { useEffect, useState } from "react";
import type { Prisma } from '@prisma/client'; // Import type for Prisma Client

const useContacts = () => {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        fetch('/api/contacts')
            .then(resp => resp.json())
            .then(data => setContacts(data));
    }, []);

    return contacts;
}
 
export default useContacts;