import InlineButton from "@/components/misc/InlineButton";

const BasicContacts = () => {
    const backgroundColor = "bg-slate-350/[26%] backdrop-blur-xl drop-shadow-2xl-c text-[#C2d1d6]/[40%]";

    return (
        <div className="p-2 rounded-xl hidden sm:flex sm:gap-2">
            <InlineButton internalTo="404Wolf.com" customBackgroundColor={ backgroundColor }>
                404Wolf.com
            </InlineButton>
            <InlineButton externalTo="mailto:caffeinate@msn.com" customBackgroundColor={ backgroundColor }>
                Caffeinate@msn.com
            </InlineButton>
            <InlineButton externalTo="tel:+10202657180" customBackgroundColor={ backgroundColor }>
                (929)265-7180
            </InlineButton>
        </div>
    );
}
 
export default BasicContacts;