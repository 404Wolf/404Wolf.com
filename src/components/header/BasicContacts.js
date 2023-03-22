import InlineButton from "@/components/misc/InlineButton";
import BasicContact from "./BasicContact";

const BasicContacts = () => {
    return (
        <div className="p-2 rounded-xl flex gap-1 md:gap-2 text-xs justify-between justify-items-stretch">
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