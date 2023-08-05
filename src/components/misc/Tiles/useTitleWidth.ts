import measure from "@/utils/measure";
import { useWindowWidth } from "@react-hook/window-size";
import { useEffect, useState } from "react";

const useTitleWidth = (title: string, fixedTitleWidth?: string | null) => {
    const [titleWidth, setTitleWidth] = useState(0);
    const windowWidth = useWindowWidth();

    useEffect(() => {
        if (!title || fixedTitleWidth) setTitleWidth(0);

        let fontSize = 28;
        if (windowWidth <= 640) {
            fontSize = 24;
        }

        setTitleWidth(
            measure(title, "bold", fontSize, "Trebuchet MS", "sans-serif", windowWidth)
        );
    }, []);

    return titleWidth;
};

export default useTitleWidth;
