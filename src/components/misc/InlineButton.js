import Link from 'next/link';

const InlineButton = ({ internalTo, externalTo, background=true, customBackgroundColor, children }) => {
    return (
        <span className={`${background && (customBackgroundColor || "bg-slate-350")} rounded-xl px-1 py-[.9px] whitespace-nowrap text-link-blue hover:text-sky-600 hover:underline`}>
            {externalTo &&
            <a href={ externalTo } target="_blank" rel="noreferrer noopener">
                { children }
            </a>}
            
            {internalTo &&
            <Link href={ internalTo }>
                <h1>{ children }</h1>
            </Link>}
        </span>
    );
}
 
export default InlineButton;