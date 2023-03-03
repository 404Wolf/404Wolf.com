import Contact from "@/components/contacts/Contact";
import { useState } from "react";

const Contacts = () => {
    function fetchIcon (name) {
        let icon = useState(null)
        import(`@/resources/icons/${name}.png`)
        .then ((fetched) => icon[1](fetched))
        .catch ((err) => console.log(err))
        return icon[0]
    }

    return (
        <div >
            <div className="flex h-screen flex-col justify-center max-w-fit items-center">
                <Contact 
                    name="Linked In" 
                    username="wolfmermelstein" 
                    icon={fetchIcon("linkedIn")}
                    url="https://www.linkedin.com/in/WolfMermelstein"
                />

                <Contact 
                    name="Instagram" 
                    username="wolf.mermelstein" 
                    icon={fetchIcon("instagram")}
                    url="https://instagram.com/wolf.mermelstein"
                />

                <Contact 
                    name="Github" 
                    username="404Wolf" 
                    icon={fetchIcon("github")}
                    url="https://github.com/404Wolf"
                />

                <Contact 
                    name="Website" 
                    username="www.techy.cc" 
                    icon={fetchIcon("website")}
                    url="https://www.techy.cc/"
                />

                <Contact 
                    name="Discord" 
                    username="Wolf#1452" 
                    icon={fetchIcon("discord")}
                    url="https://discords.com/bio/p/twilak"
                />
            </div>
        </div>
    );
}
 
export default Contacts;