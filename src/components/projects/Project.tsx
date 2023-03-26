import Link from "next/link";
import Tag from "@/components/misc/Tag"

interface ProjectProps {
    id?: string;
    name?: string;
    cover?: string;
    date?: string;
    page?: string;
    isDummy?: boolean;
}

const Project = ( { id, name, cover, date, page, isDummy=false }: ProjectProps ) => {
    return (
        <Link href={ page || "/" } className={isDummy ? "pointer-events-none" : ""}>
            <div className="bg-cover rounded-xl drop-shadow-md hover:brightness-90 ease-in transition-all p-2 relative h-[5.5rem] md:h-32 lg:h-24 bg-cover bg-center duration-100 hover:scale-105 flex items-center justify-center bg-gray-100/[35%]" style={ {backgroundImage: `url('${cover}')`} }>
                {!isDummy && <Tag children={ date }/>}

                <div className="flex flex-col">
                    <h1 className="text-center text-[12.5px] sm:text-lg text-white font-bold sm:font-extrabold" style={ {textShadow: "0 0 15px rgba(0, 0, 0, .65)"} }>
                        { name }
                    </h1>
                </div>
            </div>
        </Link>
    );
};
 
export default Project;
