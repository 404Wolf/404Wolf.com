import { useEffect, useState } from "react";
import TileTitle from "./Title";
import measure from "@/utils/measure";
import useTitleWidth from "./useTitleWidth";

interface TabTileProps {
    tabs: {
        key?: number;
        name: string;
        element: JSX.Element;
    }[];
    type?: boolean;
}

const TabTile = ({ tabs, type = false }: TabTileProps) => {
    const [currentTab, setCurrentTab] = useState(0);
    const titleWidths = tabs.map((tab) => useTitleWidth(tab.name));

    return (
        <>
            <div className="flex gap-2 absolute z-50">
                {tabs.map((tab, index) => (
                    <button key={tab.key || index} onClick={() => setCurrentTab(index)}>
                        <TileTitle
                            title={tab.name}
                            titleWidth={measure(
                                tab.name,
                                "bold",
                                16,
                                "Trebuchet MS",
                                "sans-serif"
                            )}
                            fixedTitleWidth={titleWidths[index]}
                            direction="left"
                            type={type}
                            absolute={false}
                            active={index === currentTab}
                            showActivity={true}
                        />
                    </button>
                ))}
            </div>
            <div className="mb-auto p-3 md:p-5 pt-5 md:pt-5 bg-slate-300 rounded-2xl h-full drop-shadow-sm overflow-clip">
                {tabs[currentTab].element}
            </div>
        </>
    );
};

export default TabTile;
