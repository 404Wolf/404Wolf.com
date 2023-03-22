const BasicContact = ({ children, url }) => {
    return (
        <span>
            <a href={ url } className="text-[11px] bg-mid-blue-300 md:bg-slate-350/[27%] backdrop-blur-xl drop-shadow-2xl-c text-slate-200/[55%] md:text-slate-200/[35%] rounded-xl px-1 py-px whitespace-nowrap">
                { children }
            </a>
        </span>
    );
}
 
export default BasicContact;