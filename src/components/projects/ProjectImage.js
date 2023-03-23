import Link from "next/link";
import Tag from "../misc/Tag";

const ProjectImage = ({ tag, alt, src, float, styles={} }) => {
    return (
        <Link href={ src }>
            <div className="relative inline-block float-right container my-2 duration-100 hover:scale-105" style={ styles }>
                <img
                    src={ src }
                    alt={ tag || alt }
                    className="border-slate-500 bg-slate-200 border-4"
                />
                <Tag position={ float ? "none" : ((float == "left") ? "br" : "bl") }>
                    { tag }
                </Tag>
            </div>
        </Link>
    );
}
 
export default ProjectImage;