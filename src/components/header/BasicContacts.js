import BasicContact from "./BasicContact";

const BasicContacts = () => {
    return (
        <div className="py-2 flex flex-col xs:flex-row gap-2 justify-between">
            <BasicContact url="404Wolf.com">
                404Wolf.com
            </BasicContact>

            <BasicContact url="mailto:caffeinate@msn.com">
                Caffeinate@msn.com
            </BasicContact>

            <BasicContact url="tel:+10202657180">
                (929)265-7180
            </BasicContact>
        </div>
    );
}
 
export default BasicContacts;