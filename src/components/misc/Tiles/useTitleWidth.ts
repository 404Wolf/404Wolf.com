import measure from "@/utils/measure";
import useSize from "@/utils/useSize";
import { useEffect, useState } from "react";

const useTitleWidth = (title: string, fixedTitleWidth?: string | null) => {
    const [titleWidth, setTitleWidth] = useState(0);
    const [screenWidth, screenHeight] = useSize();

    useEffect(() => {
        if (!title || fixedTitleWidth) setTitleWidth(0);

        let fontSize = 28;
        if (screenWidth <= 640) {
            fontSize = 24;
        }

        setTitleWidth(measure(title, "bold", fontSize, "Trebuchet MS", "sans-serif"));
    }, []);

    return titleWidth;
};

export default useTitleWidth;
