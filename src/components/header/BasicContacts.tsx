import BasicContact from "@/components/header/BasicContact";

const BasicContacts = () => {
    return (
        <div className="py-2 flex flex-col min-[370px]:flex-row gap-2 justify-between">
            <BasicContact url="404Wolf.com">
                404Wolf.com
            </BasicContact>

            <BasicContact url="mailto:reimagine@msn.com">
                Caffeinate@msn.com
            </BasicContact>

            <BasicContact url="tel:+10202657180">
                (929)265-7180
            </BasicContact>
        </div>
    );
}
 
export default BasicContacts;
