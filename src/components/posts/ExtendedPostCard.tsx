"useClient";

import { toTitleCase } from "@/utils/misc";
import Image from "next/image";
import Tag from "../misc/Tag";
import Link from "next/link";
import fetchPostIcon from "./fetchPostIcon";
import { KeyboardEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";

export interface PostData {
    coverUrl: string | null;
    coverAlt: string | null;
    id: string;
    title: string;
    description: string;
    date: string;
    tags: string[];
}

interface ExtendedPostCardProps {
    editableId?: boolean;
    setNewPostId?: (newId: string) => void;
    coverUrl?: string | null;
    coverAlt?: string | null;
    path: string;
    title: string;
    description: string;
    date: string;
    tags?: string[];
}

const ExtendedPostCard = ({
    editableId = false,
    setNewPostId,
    coverUrl,
    coverAlt,
    path,
    title,
    description,
    date,
    tags,
}: ExtendedPostCardProps) => {
    const [disabled, setDisabled] = useState(false);
    const editablePostIdRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (editablePostIdRef.current) editablePostIdRef.current.innerText = title;
    }, []);
    useEffect(
        () =>
            setDisabled(
                (editablePostIdRef.current &&
                    editablePostIdRef.current.innerText.includes(" ")) as boolean
            ),
        [editablePostIdRef.current?.innerText]
    );

    const linkString = useMemo(
        () => (disabled ? "pointer-events-none" : "pointer-events-auto"),
        [disabled]
    );
    const onPostIdEnterClick = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === "Enter" && editablePostIdRef.current) {
                const currentTextContent = editablePostIdRef.current.innerText;
                const trimmedCurrentTextContent = currentTextContent.slice(0, -1);
                if (currentTextContent && setNewPostId) setNewPostId(trimmedCurrentTextContent);
                editablePostIdRef.current.innerText = trimmedCurrentTextContent;
                editablePostIdRef.current.blur();
            }
        },
        [editablePostIdRef.current?.innerText]
    );

    return (
        <div className="h-[9.8rem] w-full relative container drop-shadow-md hover:drop-shadow-lg hover:scale-[102%] duration-200">
            <Link className={linkString} href={path}>
                {coverUrl ? (
                    <Image
                        fill
                        alt={coverAlt || `${title}'s cover image`}
                        src={coverUrl || "/icons/load.svg"}
                        className="object-cover rounded-xl z-0"
                    />
                ) : (
                    <div className="bg-gray-400 w-full h-full" />
                )}

                <div className="absolute z-50 -top-2 -right-2 rounded-xl">
                    {fetchPostIcon(tags || [])}
                </div>
            </Link>
            {editableId && setNewPostId ? (
                <h1
                    onInput={(e) => setNewPostId(e.currentTarget.textContent || "")}
                    contentEditable={true}
                    className="z-50 px-2 py-px text-white text-[15px] absolute -top-2 -left-2 bg-slate-600 rounded-full"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                    ref={editablePostIdRef}
                    onKeyUp={onPostIdEnterClick}
                />
            ) : (
                <Link className={linkString} href={path}>
                    <h1 className="z-50 px-2 py-px text-white text-[15px] absolute -top-2 -left-2 bg-slate-600 rounded-full">
                        {title}
                    </h1>
                </Link>
            )}
            <Link className={linkString} href={path}>
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
            </Link>
        </div>
    );
};

export default ExtendedPostCard;
