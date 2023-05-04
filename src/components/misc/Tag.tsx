interface TagProps {
    children: React.ReactNode;
    position?: "br" | "bl" | "tr" | "tl" | null;
    width?: string;
    rotation?: number;
    zLevel?: number;
    extraYTranslation?: number;
    extraXTranslation?: number;
    absolute?: boolean;
    background?: string;
}

const Tag = ({ children, width="fit", rotation=0, extraYTranslation=0, extraXTranslation=0, zLevel=50, absolute=true, background="#4B5769", position=null}: TagProps) => {
    let positioning
    let translations

    // case tree for position
    switch (position) {
        case "br":
            positioning = {bottom: 0, right: 0}
            translations = [.25, .25]
            break;
        case "bl":
            positioning = {bottom: 0, left: 0}
            translations = [-.25, .25]
            break;
        case "tr":
            positioning = {top: 0, right: 0}
            translations = [.25, -.25]
            break;
        case "tl":
            positioning = {top: 0, left: 0}
            translations = [-.25, -.25]
            break;
        default:
            positioning = {bottom: 0, right: 0}
            translations = [.25, .25]
            break;
    }

    // Add extra translations
    translations[0] += extraXTranslation
    translations[1] += extraYTranslation

    return (
        <div 
            className="text-[10px] sm:text-md text-white px-1 sm:px-1 py-[.5px] rounded-lg"
            style={{
                width: `${width}`,
                transform: `translate(${translations[0]}rem, ${translations[1]}rem) rotate(${rotation}deg)`,
                rotate: `${rotation}`,
                zIndex: `${zLevel}`,
                position: `${absolute ? "absolute" : "relative"}`,
                backgroundColor: background,
                ...positioning
            }}
        >
            { children }
        </div>
    );
}
 
export default Tag;
