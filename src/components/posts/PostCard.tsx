import Link from "next/link";
import Tag from "@/components/misc/Tag"

interface PostCardProps {
    id?: string;
    name?: string;
    cover?: string;
    date?: string;
    page?: string;
    type?: string;
    isDummy?: boolean;
    tags?: string[];
}

const PostCard = ( { id, name, cover, date, page, type, tags, isDummy=false }: PostCardProps ) => {
    return (
        <div className="relative p-2">
            <Link href={ page || "/" } className={`z-10 ${isDummy ? "pointer-events-none" : ""}`}>
                <div className="bg-cover rounded-xl drop-shadow-md hover:brightness-90 ease-in transition-all relative h-[5.5rem] md:h-32 lg:h-24 bg-cover bg-center duration-100 hover:scale-105 flex items-center justify-center bg-gray-100/[35%]" style={ {backgroundImage: `url('${cover}')`} }>
                    {!isDummy && <div className={type && "flex gap-1 absolute bottom-0 right-0"}>
                        {type && <Tag children={ type } absolute={ !type }/> }
                        <Tag children={ date } absolute={ !type }/> 
                        {tags && tags.map((tag, index) => (
                            <Tag key={index} children={ tag } absolute={ !type }/>
                        ))}
                    </div>
                    }

                    <div className="flex flex-col">
                        <h1 className="text-center text-[12.5px] sm:text-lg text-white font-bold sm:font-extrabold" style={ {textShadow: "0 0 15px rgba(0, 0, 0, .65)"} }>
                            { name }
                        </h1>
                    </div>
                </div>
            </Link>
        </div>
    );
};
 
export default PostCard;
