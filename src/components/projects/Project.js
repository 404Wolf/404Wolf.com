import Image from "next/Image";
import Link from "next/Link";
import { useEffect, useState } from "react";

const Project = ( { id, name, cover, page, isDummy=false } ) => {
    if (isDummy) {
        return <div></div>
    }

    const [ imgSrc, setImgSrc ] = useState(null)
    
    useEffect(() => {
        if (!isDummy) {
          import(`@/projects/${id}/${cover}`)
            .then((module) => setImgSrc(module.default))
        }
    }, []);
    
    return (
        <div 
            className="p-2 rounded-xl w-[30%] h-24 bg-cover flex flex-col items-center justify-center bg-center drop-shadow-xl-c duration-100 hover:scale-105" 
            style={imgSrc && {backgroundImage: `url('${imgSrc.src}')`}}
        >
            <Link href={ page }>
                <div className="max-w-fit max-h-fit p-2 select-none">
                    <h1 
                        className="text-center text-xl text-white font-bold"
                        style={ {textShadow: "0 0 12px rgba(0, 0, 0, .8)"} }
                    >
                        {name}
                    </h1>
                </div>
            </Link>
        </div>
    );
};
 
export default Project;