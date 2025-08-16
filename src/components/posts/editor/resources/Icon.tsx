import Image from "next/image";

interface ResourceIconProps {
	icon: string;
	alt: string;
	enabled?: boolean;
}

const ResourceIcon = ({ icon, alt, enabled = false }: ResourceIconProps) => {
	return (
		<div
			className={
				enabled ? "bg-gray-700 rounded-full" : "bg-gray-500 rounded-full"
			}
		>
			<div className=" z-50 drop-shadow-xl hover:brightness-90 hover:scale-110 transition-all duration-50 ease-in-out">
				<div className="h-6 w-6">
					{icon && (
						<Image
							src={`/icons/${icon}.svg`}
							className="p-[2px]"
							alt={alt}
							fill
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default ResourceIcon;
