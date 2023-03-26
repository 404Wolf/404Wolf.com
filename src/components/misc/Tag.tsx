interface TagProps {
    children: React.ReactNode;
    position?: "br" | "bl" | "tr" | "tl" | null;
    width?: string;
}

const Tag = ({ children, width="fit", position=null}: TagProps) => {
    let positioning
    let translations

    // case tree for position
    switch (position) {
        case "br":
            positioning = "bottom-0 right-0"
            translations = "translate-x-2 translate-y-2"
            break;
        case "bl":
            positioning = "bottom-0 left-0"
            translations = "-translate-x-2 translate-y-2"
            break;
        case "tr":
            positioning = "top-0 right-0"
            translations = "translate-x-2 -translate-y-2"
            break;
        case "tl":
            positioning = "top-0 left-0"
            translations = "-translate-x-2 -translate-y-2"
            break;
        default:
            positioning = "bottom-0 right-0"
            translations = "translate-x-2 translate-y-2"
            break;
    }

    return (
        <div className={ `w-${width} text-xs sm:text-md absolute ${positioning} ${translations} bg-[#545454] text-white p-1 py-px rounded-lg z-50` }>
            { children }
        </div>
    );
}
 
export default Tag;
