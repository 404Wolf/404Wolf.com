import Tile from "@/components/misc/Tile";
import Link from "next/link";
import { useState } from "react";
import BasicContacts from "../components/contacts/BasicContacts";
import Header from "./header/Header";
import ProfileButton from "@/components/auth/ProfileButton";

interface MainLayoutProps {
    children: React.ReactNode;
    title?: string | JSX.Element;
    titleWidth?: string;
    editableTitle?: boolean;
    onTitleEdit?: (text: string) => void;
    header?: boolean;
    headerChildren?: JSX.Element;
    subtitleFixedWidth?: string;
    containerClasses?: string;
}

const MainLayout = ({
    children,
    title,
    titleWidth = "w-fit",
    editableTitle = false,
    onTitleEdit,
    header = true,
    headerChildren,
    subtitleFixedWidth,
    containerClasses,
}: MainLayoutProps) => {
    let [blurred, setBlurred] = useState(false);
    const titleElementClasses = `absolute hover:brightness-90 -top-3 md:-top-5 -left-3 md:-left-5 bg-gray-700 text-white rounded-3xl sm:rounded-full py-[5px] md:py-2 sm:py-[6px] px-4 ${titleWidth} text-[22px] sm:text-[30px] font-bold z-50`;

    return (
        <div className={containerClasses}>
            <div
                className={`relative pt-7 sm:pt-8 duration-100 ${
                    blurred ? "blur-sm contrast-75" : ""
                }`}
            >
                {title && editableTitle ? (
                    <div
                        className={titleElementClasses}
                        onInput={(e) => {
                            if (onTitleEdit) onTitleEdit(e.currentTarget.textContent || "");
                        }}
                        contentEditable="true"
                    >
                        {title}
                    </div>
                ) : (
                    <Link href="/">
                        <div className={titleElementClasses}>{title}</div>
                    </Link>
                )}

                <div className={"fixed bottom-2 right-2"}>
                    <ProfileButton size={20} />
                </div>

                <div className="hidden sm:block absolute sm:fixed sm:top-[7.7rem] -sm:right-[8rem] md:-right-[7.7rem] sm:rotate-90">
                    <BasicContacts />
                </div>

                <div className="bg-slate-500 p-6 rounded-3xl drop-shadow-4xl-c">
                    {header && (
                        <div className="pb-9">
                            <Tile fixedTitleWidth={subtitleFixedWidth}>
                                <Header
                                    setBackgroundBlurred={setBlurred}
                                    children={headerChildren}
                                />
                            </Tile>
                        </div>
                    )}

                    {children}
                </div>
            </div>
        </div>
    );
};

export default MainLayout;
