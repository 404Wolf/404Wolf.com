import Image from "next/image";
import Link from "next/link";

interface CircleButtonProps {
	action?: () => void;
	internalSrc?: string;
	externalSrc?: string;
	openInNewTab?: boolean;
	iconSrc: string;
	iconAlt: string;
	iconSize?: number;
}

const CircleButton = ({
	action,
	internalSrc,
	externalSrc,
	openInNewTab = true,
	iconSrc,
	iconAlt,
	iconSize = 90,
}: CircleButtonProps) => {
	const icon = (
		<Image
			priority
			src={iconSrc}
			alt={iconAlt}
			width={iconSize}
			height={iconSize}
		/>
	);

	return (
		<div className="bg-gray-700 hover:brightness-90 rounded-full p-2 w-[60px] h-[60px]">
			{internalSrc && (
				<Link href={internalSrc} target={openInNewTab ? "_blank" : undefined}>
					{icon}
				</Link>
			)}
			{externalSrc && (
				<a href={externalSrc} target={openInNewTab ? "_blank" : undefined}>
					{icon}
				</a>
			)}
			{action && <button onClick={action}>{icon}</button>}
		</div>
	);
};

export default CircleButton;
