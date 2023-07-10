import { useEffect, useState } from "react";
import Typewriter from "typewriter-effect";
import useSize from "@/utils/useSize";
import measure from "@/utils/measure";

export interface TileProps {
    title?: string;
    className?: string;
    children: React.ReactNode;
    direction?: "left" | "right";
    extraPadding?: number;
    fixedTitleWidth?: string | null;
    containerClass?: string;
}

const Tile = ({
    title,
    children,
    className = "",
    direction = "left",
    extraPadding = 0,
    fixedTitleWidth = null,
    containerClass = "h-full relative",
}: TileProps) => {
    const [screenWidth, screenHeight] = useSize();
    const [titleWidth, setTitleWidth] = useState(fixedTitleWidth || 0);

    useEffect(() => {
        if (!title || fixedTitleWidth) return;

        let fontSize = 28;
        if (screenWidth <= 640) {
            fontSize = 24;
        }

        setTitleWidth(measure(title, "bold", fontSize, "Trebuchet MS", "sans-serif"));
    }, []);

    return (
        <div className={containerClass}>
            {title && (
                <div
                    style={titleWidth && !fixedTitleWidth ? { width: `${titleWidth}px` } : {}}
                    className={`${
                        fixedTitleWidth ? fixedTitleWidth + " " : ""
                    } text-center absolute -translate-y-[1.15rem] ${
                        direction == "left"
                            ? "-translate-x-[.9rem]"
                            : "translate-x-[.9rem] right-0"
                    } bg-gray-700 text-white text-lg py-[.15rem] px-2 rounded-full z-50`}
                >
                    <h2 className="text-xl sm:text-2xl text-bold">
                        <Typewriter
                            onInit={(typewriter) => {
                                typewriter.typeString(title).start();
                            }}
                            options={{ delay: 100, cursor: " " }}
                        />
                    </h2>
                </div>
            )}
            <div
                className={`${className} mb-auto p-3 md:p-5 pt-5 md:pt-5 bg-slate-300 rounded-2xl h-full ${className} drop-shadow-sm overflow-clip`}
            >
                <div style={{ padding: `${extraPadding}px` }}>{children}</div>
            </div>
        </div>
    );
};

export default Tile;
