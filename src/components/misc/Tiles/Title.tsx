import Typewriter from "typewriter-effect";

interface TileTitleProps {
    title: string;
    titleWidth: string | number;
    fixedTitleWidth: string | number | null;
    direction: string;
    type: boolean;
    absolute?: boolean;
    active?: boolean;
    showActivity?: boolean;
}

const TileTitle = ({
    title,
    titleWidth,
    fixedTitleWidth,
    direction,
    type,
    absolute = true,
    active = true,
    showActivity = false,
}: TileTitleProps) => {
    return (
        <div
            style={titleWidth && !fixedTitleWidth ? { width: `${titleWidth}px` } : {}}
            className={`${fixedTitleWidth ? fixedTitleWidth + " " : ""} text-center ${
                absolute && "absolute"
            } -translate-y-[1.15rem] ${
                direction == "left" ? "-translate-x-[.9rem]" : "translate-x-[.9rem] right-0"
            } ${
                active
                    ? showActivity
                        ? "bg-gray-700 text-white"
                        : "bg-gray-700 text-white"
                    : "bg-gray-600 text-gray-400 hover:brightness-90 duration-100"
            }  text-lg py-[.15rem] px-2 rounded-full z-20`}
        >
            <h2 className="text-xl sm:text-2xl text-bold">
                {type ? (
                    <Typewriter
                        onInit={(typewriter) => {
                            typewriter.typeString(title).start();
                        }}
                        options={{ delay: 100, cursor: " " }}
                    />
                ) : (
                    title
                )}
            </h2>
        </div>
    );
};

export default TileTitle;
