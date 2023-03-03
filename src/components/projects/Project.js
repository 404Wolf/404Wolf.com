import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Project = ( { id, name, image, page } ) => {
    const fetchedImage = useState(null);

    import(`@/projects/${id}/${image}`).then(fetched => fetchedImage[1](fetched))

    return (
        <div>
            <h1>{ name }</h1>
            {fetchedImage && 
                <Link href={ page }>
                    <Image width={ 60 } height={ 60 } src={ fetchedImage[0] || "/" } alt={ name }/>
                </Link>
            }
        </div>
    );
};
 
export default Project;