import Contact from "@/components/contacts/contact";
import { useState } from "react";

const Contacts = () => {
    function fetchIcon (name: string): string | null {
        return `/icons/${name}.svg`
    }

    return (
        <div className="flex items-center">
            <Contact 
                name="Linked In" 
                key="linkedIn"
                username="wolfmermelstein" 
                icon={fetchIcon("linkedIn")}
                url="https://www.linkedin.com/in/WolfMermelstein"
            />

            <Contact 
                name="Instagram" 
                key="instagram"
                username="wolf.mermelstein" 
                icon={fetchIcon("instagram")}
                url="https://instagram.com/wolf.mermelstein"
            />

            <Contact 
                name="Github" 
                key="github"
                username="404Wolf" 
                icon={fetchIcon("github")}
                url="https://github.com/404Wolf"
            />

            <Contact 
                name="Website" 
                key="website"
                username="www.techy.cc" 
                icon={fetchIcon("website")}
                url="https://www.techy.cc/"
            />

            <Contact 
                name="Discord" 
                key="discord"
                username="Wolf#1452" 
                icon={fetchIcon("discord")}
                url="https://discords.com/bio/p/twilak"
            />
        </div>
    );
}
 
export default Contacts;
