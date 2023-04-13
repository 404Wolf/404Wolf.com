import { useEffect, useState } from "react";
import Typewriter from "typewriter-effect";

interface TileProps {
    title?: string;
    className?: string;
    children: React.ReactNode;
    direction?: "left" | "right";
    extraPadding?: number;
}

const Tile = ({
    title,
    children,
    className = "",
    direction = "left",
    extraPadding = 0,
}: TileProps) => {
    return (
        <div className="h-full relative">
            {title && (
                <div
                    className={`text-center absolute -translate-y-[1.15rem] ${
                        direction == "left"
                            ? "-translate-x-[.9rem]"
                            : "translate-x-[.9rem] right-0"
                    } bg-gray-700 text-white text-lg p-[.15rem] rounded-full w-28 sm:w-36 z-50`}
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
                className={`${className} mb-auto p-3 md:p-5 bg-slate-300 rounded-2xl h-full ${className} drop-shadow-sm`}
            >
                <div style={{ padding: `${extraPadding}px` }}>{children}</div>
            </div>
        </div>
    );
};

export default Tile;
