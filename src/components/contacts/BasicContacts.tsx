import BasicContact from "@/components/contacts/BasicContact";
import useAbout from "@/components/about/useAbout";

const BasicContacts = () => {
    const about = useAbout()

    return (
        <div className="py-2 flex flex-col min-[370px]:flex-row gap-2 justify-between">
            <BasicContact url={ `https://${about.url}` }>
                {about.url}
            </BasicContact>

            <BasicContact url={ `mailto:${about.email}` }>
                {about.email}
            </BasicContact>

            <BasicContact url={ `tel:+${about.phone.link}` }>
                {about.phone.display}
            </BasicContact>
        </div>
    );
}
 
export default BasicContacts;
