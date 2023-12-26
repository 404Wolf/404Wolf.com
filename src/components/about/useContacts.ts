import {useEffect, useState} from "react";

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