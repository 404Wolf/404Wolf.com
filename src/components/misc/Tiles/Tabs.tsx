import { ReactNode, useState } from "react";
import TileTitle from "./Title";
import measure from "@/utils/measure";
import useTitleWidth from "./useTitleWidth";
import CircleButton from "@/components/posts/editor/CircleButton";
import { useWindowWidth } from "@react-hook/window-size";

interface TabTileProps {
	tabs: {
		key?: number;
		name: string;
		element: JSX.Element;
	}[];
	children?: ReactNode;
	type?: boolean;
	shown?: boolean;
	setShown?: (show: boolean) => void;
}

const TabTile = ({
	tabs,
	children,
	type = false,
	shown,
	setShown,
}: TabTileProps) => {
	const windowWidth = useWindowWidth();
	const [currentTab, setCurrentTab] = useState(0);
	const titleWidths = tabs.map((tab) => useTitleWidth(tab.name));
	const showButton =
		shown !== undefined && setShown !== undefined ? (
			<ShowTabTile shown={shown} setShown={setShown} />
		) : (
			<></>
		);

	return (
		<div className="h-full">
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
								"sans-serif",
								windowWidth,
							)}
							direction="left"
							type={type}
							absolute={false}
							active={index === currentTab}
							showActivity={true}
						/>
					</button>
				))}
			</div>

			<div className="z-50 scale-50 brightness-[120%] absolute -right-6 -top-6">
				{showButton}
			</div>

			<div
				hidden={shown !== undefined ? !shown : false}
				className="h-full relative mb-auto pt-5 md:pt-5 bg-slate-300 rounded-2xl drop-shadow-sm overflow-clip z-20"
			>
				{tabs[currentTab].element}
			</div>
		</div>
	);
};

export function ShowTabTile({
	shown,
	setShown,
}: {
	shown: boolean;
	setShown: (shown: boolean) => void;
}) {
	return (
		<div className="rotate-90">
			<CircleButton
				action={
					shown !== undefined && setShown !== undefined
						? () => setShown(!shown)
						: () => {}
				}
				iconSrc="/icons/expand.svg"
				iconAlt="Show additional post config area"
			/>
		</div>
	);
}

export default TabTile;
