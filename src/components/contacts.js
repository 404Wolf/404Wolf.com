import Contact from "@/components/contact";

// Import all the needed icons
import LinkedInIcon from "@/resources/icons/linkedIn.png"
import InstagramIcon from "@/resources/icons/instagram.png"
import GithubIcon from "@/resources/icons/github.png"
import WebsiteIcon from "@/resources/icons/website.png"
import DiscordIcon from "@/resources/icons/discord.png"

const Contacts = () => {
    return (
        <div className="flex flex-col">
            <Contact 
                name="Linked In" 
                username="wolfmermelstein" 
                image={ LinkedInIcon }
                url=""
            />

            <Contact 
                name="Instagram" 
                username="wolf.mermelstein" 
                image={ InstagramIcon }
                url=""
            />

            <Contact 
                name="Github" 
                username="404Wolf" 
                image={ GithubIcon }
                url=""
            />

            <Contact 
                name="Website" 
                username="www.techy.cc" 
                image={ WebsiteIcon }
                url=""
            />

            <Contact 
                name="Discord" 
                username="Wolf#1452" 
                image={ DiscordIcon }
                url=""
            />
        </div>
    );
}
 
export default Contacts;