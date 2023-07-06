import { toTitleCase } from "@/utils/misc";
import Image from "next/image";
import Tag from "../misc/Tag";
import Link from "next/link";
import fetchPostIcon from "./fetchPostIcon";

const nullDescription = "Description coming soon!";

interface ExtendedPostCardProps {
    coverUrl: string;
    coverAlt?: string;
    path: string;
    title: string;
    description: string;
    date: string;
    tags?: string[];
}

const ExtendedPostCard = ({
    coverUrl,
    coverAlt,
    path,
    title,
    description,
    date,
    tags,
}: ExtendedPostCardProps) => {
    return (
        <Link href={path}>
            <div className="h-[9.8rem] w-full relative container drop-shadow-md hover:drop-shadow-lg hover:scale-[102%] duration-200">
                <Image
                    fill
                    alt={coverAlt || `${title}'s cover image`}
                    src={coverUrl}
                    className="object-cover rounded-xl z-0"
                />

                <div className="absolute z-50 -top-2 -right-2">
                    {fetchPostIcon(tags || [])}
                </div>

                <h1 className="z-50 px-2 py-px text-white text-[15px] absolute -top-2 -left-2 bg-slate-600 rounded-full">
                    {title}
                </h1>

                <div className="flex gap-x-[4px] absolute -bottom-1 -left-2">
                    {tags?.map((tag, index) => (
                        <Tag
                            key={index}
                            children={toTitleCase(tag)}
                            absolute={false}
                            background="#475569"
                        />
                    ))}
                </div>

                <h1 className="z-50 px-2 py-px text-white text-lg absolute -bottom-2 -right-2 bg-slate-600 rounded-full">
                    {date}
                </h1>

                <p className="border-t-2 border-l-2 border-slate-500 absolute right-0 bottom-0 z-30 w-5/6 md:w-2/3 indent-4 bg-gray-200 rounded-tl-3xl overflow-hidden h-[55%] md:h-[62%] p-[4px] text-[11px]">
                    {description}
                </p>
            </div>
        </Link>
    );
};

export default ExtendedPostCard;
