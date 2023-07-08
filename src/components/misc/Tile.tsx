import { useEffect, useState } from "react";
import Typewriter from "typewriter-effect";
import { useTextWidth } from "@tag0/use-text-width";
import useSize from "@/utils/useSize";

export interface TileProps {
    title?: string;
    className?: string;
    children: React.ReactNode;
    direction?: "left" | "right";
    extraPadding?: number;
    fixedTitleWidth?: string | null;
}

const Tile = ({
    title,
    children,
    className = "",
    direction = "left",
    extraPadding = 0,
    fixedTitleWidth = null,
}: TileProps) => {
    const [screenWidth, screenHeight] = useSize();
    const [titleWidth, setTitleWidth] = useState(fixedTitleWidth || 0);

    useEffect(() => {
        if (!title || fixedTitleWidth) return;

        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        let fontSize = 24;
        if (screenWidth <= 640) {
            fontSize = 20;
        }

        if (context) {
            context.font = `bold ${fontSize + 7}px 'Trebuchet MS', sans-serif`;
            setTitleWidth(context.measureText(title).width + 20);
        }
    }, []);

    return (
        <div className="h-full relative">
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
