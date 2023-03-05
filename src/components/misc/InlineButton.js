import Link from 'next/Link';

const InlineButton = ({ to, sameSiteTo, externalTo, background=true, children }) => {
    return (
        <span className={`${background && "bg-slate-350"} rounded-xl px-1 py-[.9px] whitespace-nowrap text-link-blue hover:text-sky-600 hover:underline`}>
            {externalTo &&
            <a href={ to } target="_blank" rel="noreferrer noopener">
                { children }
            </a>}
            
            {sameSiteTo &&
            <Link href={ to }>
                { children }
            </Link>}
        </span>
    );
}
 
export default InlineButton;