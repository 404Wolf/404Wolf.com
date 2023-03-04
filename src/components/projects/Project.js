import Link from "next/Link";
import { useEffect, useState } from "react";

const Project = ( { id, name, cover, date, page, isDummy=false } ) => {
    const [ background, setBackground ] = useState(
        {backgroundColor: "rgba(255, 255, 255, .2)"}
    )

    useEffect(() => {
        if (!isDummy) {
            setBackground({backgroundImage: `url(${`/projects/${id}/${cover}`.toString()})`})
        }
    }, [cover])
    

    return (
        <div>
            <Link href={ page || "/" }>
                <div className="hover:brightness-90 ease-in transition-all p-2 relative drop-shadow-lg rounded-xl h-24 bg-cover bg-center duration-100 hover:scale-105 flex items-center justify-center" style={ background }>

                    {!isDummy && <div className="absolute bottom-0 right-0 translate-x-2 translate-y-2 bg-[#545454] text-white p-1 py-px rounded-lg bottom-0">
                        { date }
                    </div>}

                    <div className="flex flex-col">
                        <h1 className="text-center text-lg text-white font-extrabold" style={ {textShadow: "0 0 15px rgba(0, 0, 0, .65)"} }>
                            { name }
                        </h1>
                    </div>
                    
                </div>
            </Link>
        </div>
    );
};
 
export default Project;