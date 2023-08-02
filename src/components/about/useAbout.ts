import AboutData from "@/components/about/AboutData";
import { useEffect, useState } from "react";

const blankAbout = {
    "url": "",
    "name": "",
    "email": "",
    "phone": "",
    "location": "",
    "booking": "",
    "contacts": [],   
}

const useAbout = (): AboutData => {
    const [about, setAbout] = useState<AboutData>(blankAbout);

    useEffect(() => {
        const fetchAbout = async () => {
            const response = await fetch('/api/about');
            const about = await response.json();
            setAbout(about);
        }
        fetchAbout();
    }, []);

    return about;
}
 
export default useAbout;