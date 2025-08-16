"use client";

import NextImage from "next/image";
import imageWidthTree from "@/markdown/imageTree";
import Tag from "@/components/misc/Tag";
import { createHash } from "crypto";
import { useCallback, useEffect, useMemo, useState } from "react";
import Modal from "@/components/misc/Modal";

const videoExtensions = ["avi", "mp4", "webm", "ogg"];

interface ImageProps {
	alt: string;
	src: string;
	title: string;
	stylize?: boolean;
	width?: string;
	float?: string;
	label?: string;
	autoplay?: boolean;
	nextImgSize?: [number, number];
	resourceMap?: { [key: string]: string };
	imgClasses?: string;
}

const Image = ({
	alt,
	src,
	title,
	stylize = true,
	width,
	float = "right",
	label,
	autoplay = false,
	nextImgSize = [500, 500],
	resourceMap = {},
	imgClasses = "",
}: ImageProps) => {
	let [imageStyleId, setImageStyleId] = useState("");
	let [imageStyleWidthTree, setImageStyleWidthTree] = useState<null | string>(
		null,
	);

	// Determine if src is a direct URL or an ID to be resolved via resourceMap
	const actualSrc =
		src.startsWith("http://") || src.startsWith("https://")
			? src
			: resourceMap[src] || "";
	if (
		!Object.keys(resourceMap).includes(src) &&
		!src.startsWith("http://") &&
		!src.startsWith("https://")
	) {
		resourceMap[src] = "";
	}

	const extension = actualSrc.split(".").pop();
	const [margin, setMargin] = useState({
		marginLeft: "0px",
		marginRight: "0px",
	});
	const [tagPos, setTagPos] = useState("");
	const [enlarged, setEnlarged] = useState(false);
	const requestedWidth = width ? parseInt(width) : 36;

	const makeEnlarged = useCallback(() => {
		if (!videoExtensions.includes(extension || "")) {
			setEnlarged(true);
		}
	}, [extension]);

	useEffect(() => {
		if (stylize) {
			const generatedImageStyleId =
				"_a" +
				createHash("sha256")
					.update(src + title + alt + float + label + width)
					.digest("hex");
			setImageStyleId(generatedImageStyleId);
			setImageStyleWidthTree(
				imageWidthTree(requestedWidth, generatedImageStyleId),
			);

			switch (float) {
				case "left":
					setMargin({ marginRight: "10px", marginLeft: "0px" });
					setTagPos("br");
					return;
				case "right":
					setMargin({ marginRight: "0px", marginLeft: "10px" });
					setTagPos("br");
					return;
				case "none":
					setMargin({ marginRight: "auto", marginLeft: "auto" });
					setTagPos("br");
			}
		}
	}, []);

	const imgProps = {
		alt: alt,
		src: actualSrc,
		title: title,
		width: nextImgSize[0],
		height: nextImgSize[1],
	};

	const mediaItem = useMemo(() => {
		if (videoExtensions.includes(extension || "")) {
			const videoElement = (
				<video
					playsInline
					className="rounded-xl border-slate-300 border-[2px] w-full h-full"
					key={6666}
					controls
					autoPlay={autoplay}
				>
					<source src={actualSrc} type={`video/${extension}`} />
				</video>
			);

			return (
				<>
					<a
						href={actualSrc}
						target="_blank"
						rel="noopener noreferrer"
						className="md:hidden"
					>
						{videoElement}
					</a>
					<div className="md:block">{videoElement}</div>
				</>
			);
		} else {
			return (
				<NextImage
					{...imgProps}
					className={`rounded-xl w-full h-full border-slate-300 border-[2px] ${imgClasses}`}
				/>
			);
		}
	}, [imgClasses, actualSrc, autoplay]);

	return (
		<div className="hover:drop-shadow-2xl">
			<Modal
				className="rounded-2xl drop-shadow-5xl-c fixed p-7"
				open={enlarged}
				onClose={() => setEnlarged(false)}
				setOpen={makeEnlarged}
			>
				<div className="p-0 relative">
					{label && <Tag position={tagPos}>{label}</Tag>}
					{mediaItem}
				</div>
			</Modal>

			{stylize && <style>{imageStyleWidthTree}</style>}
			<div
				id={imageStyleId}
				className="relative cursor-pointer my-4"
				style={
					margin && { float: float as "right" | "left" | "none", ...margin }
				}
			>
				{label && !enlarged && <Tag position={tagPos}>{label}</Tag>}
				<a onClick={makeEnlarged}>{mediaItem}</a>
			</div>
		</div>
	);
};

export default Image;
