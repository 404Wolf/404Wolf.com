import Link from 'next/link';

interface InlineButtonProps {
    internalTo?: string;
    externalTo?: string;
    className?: string;
    children: React.ReactNode;
}

const InlineButton = ({
        internalTo, 
        externalTo, 
        className: background, 
        children 
    }: InlineButtonProps) => {
    return (
        <span className={`${background || "bg-slate-350"} rounded-xl px-1 py-[.9px] whitespace-nowrap text-link-blue hover:text-sky-600 hover:underline`}>
            {externalTo &&
            <a href={ externalTo } target="_blank" rel="noreferrer noopener">
                { children }
            </a>}

            {internalTo &&
            <Link href={ internalTo }>
                { children }
            </Link>}
        </span>
    );
}
 
export default InlineButton;
