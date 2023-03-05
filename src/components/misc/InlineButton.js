const InlineButton = ({ to, children }) => {
    return (
    <span className="bg-slate-350 rounded-xl px-1 py-[.9px] whitespace-nowrap hover:text-sky-900 hover:underline">
            <a href={ to } target="_blank" rel="noreferrer noopener">
                { children }
            </a>
        </span>
    );
}
 
export default InlineButton;