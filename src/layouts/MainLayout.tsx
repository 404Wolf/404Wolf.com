import Tile from "@/components/misc/Tile";
import Link from "next/link";
import { useState } from "react";
import BasicContacts from "../components/contacts/BasicContacts";
import Header from "./header/Header";
import { TileProps } from "@/components/misc/Tile";

interface MainLayoutProps {
    children: React.ReactNode;
    title?: string | JSX.Element;
    header?: boolean;
    headerChildren?: JSX.Element;
    titleWidth?: string;
    subtitleFixedWidth?: string;
}

const MainLayout = ({
    children,
    title,
    titleWidth = "w-fit",
    header = true,
    headerChildren,
    subtitleFixedWidth,
}: MainLayoutProps) => {
    let [blurred, setBlurred] = useState(false);

    return (
        <div>
            <div
                className={`relative pt-7 sm:pt-8 duration-100 ${
                    blurred ? "blur-sm contrast-75" : ""
                }`}
            >
                {title && (
                    <div>
                        <Link href="/">
                            <div
                                className={`absolute -top-3 md:-top-5 -left-3 md:-left-5 bg-gray-700 text-white rounded-3xl sm:rounded-full py-[5px] md:py-2 sm:py-[6px] px-4 ${titleWidth} text-[22px] sm:text-[30px] font-bold z-50`}
                            >
                                {title}
                            </div>
                        </Link>
                    </div>
                )}

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
