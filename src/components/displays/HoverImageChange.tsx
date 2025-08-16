"use client";

import Image from "next/image";
import { useState } from "react";

export default function HoverImageChange({
	imageSrc1,
	imageSrc2,
	width = 200,
	height = 200,
	imageClasses = "rounded-xl",
}: {
	imageSrc1: string;
	imageSrc2: string;
	width?: number;
	height?: number;
	imageClasses?: string;
}) {
	const [hover, setHover] = useState(false);

	return (
		<div
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
		>
			<Image
				src={hover ? imageSrc2 : imageSrc1}
				alt="profile"
				className={imageClasses}
				width={width}
				height={height}
			/>
		</div>
	);
}
