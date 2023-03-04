import Link from "next/Link";
import { useEffect, useState } from "react";

const Project = ( { id, name, cover, page, isDummy=false } ) => {
    const [ background, setBackground ] = useState(
        {backgroundColor: "rgb(200, 200, 200)"}
    )

    useEffect(() => {
        if (!isDummy) {
            import(`@/projects/${id}/${cover}`)
            .then(
                (module) => setBackground(
                    {backgroundImage:`url(${module.default.src})`}
                )
            )
        }
    }, [cover])
    

    return (
        <div>
            <Link href={ page || "/" }>
                <div className="p-2 rounded-xl h-24 bg-cover bg-center duration-100 hover:scale-105 flex items-center justify-center" style={ background }>

                    <h1 className="text-center text-lg text-white font-bold" style={ {textShadow: "0 0 12px rgba(0, 0, 0, .8)"} }>
                        { name }
                    </h1>
                    
                </div>
            </Link>
        </div>
    );
};
 
export default Project;