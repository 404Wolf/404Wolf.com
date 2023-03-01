import Contact from "@/components/contact";

// Import all the needed icons
import LinkedInIcon from "@/resources/icons/linkedIn.png"
import InstagramIcon from "@/resources/icons/instagram.png"
import GithubIcon from "@/resources/icons/github.png"
import WebsiteIcon from "@/resources/icons/website.png"
import DiscordIcon from "@/resources/icons/discord.png"

const Contacts = () => {
    return (
        <div >
            <div className="flex h-screen flex-col justify-center max-w-fit items-center">
                <Contact 
                    name="Linked In" 
                    username="wolfmermelstein" 
                    icon={ LinkedInIcon }
                    url=""
                />

                <Contact 
                    name="Instagram" 
                    username="wolf.mermelstein" 
                    icon={ InstagramIcon }
                    url=""
                />

                <Contact 
                    name="Github" 
                    username="404Wolf" 
                    icon={ GithubIcon }
                    url=""
                />

                <Contact 
                    name="Website" 
                    username="www.techy.cc" 
                    icon={ WebsiteIcon }
                    url=""
                />

                <Contact 
                    name="Discord" 
                    username="Wolf#1452" 
                    icon={ DiscordIcon }
                    url=""
                />
            </div>
        </div>
    );
}
 
export default Contacts;