import { useWindowWidth } from "@react-hook/window-size";
import { useEffect, useState } from "react";
import measure from "@/utils/measure";

const useTitleWidth = (title: string) => {
	const [titleWidth, setTitleWidth] = useState(0);
	const windowWidth = useWindowWidth();

	useEffect(() => {
		if (!title) setTitleWidth(0);

		let fontSize = 28;
		if (windowWidth <= 640) {
			fontSize = 24;
		}

		setTitleWidth(
			measure(
				title,
				"bold",
				fontSize,
				"Trebuchet MS",
				"sans-serif",
				windowWidth,
			),
		);
	}, [title, windowWidth]);

	return titleWidth;
};

export default useTitleWidth;
