"use client";

import { useCallback } from "react";
import type { Image, Link } from "mdast";
import type { Plugin } from "unified";
import CircleButton from "./CircleButton";
import { remark } from "remark";
import { visit } from "unist-util-visit";

interface DownloadMarkdownProps {
	markdown: string;
	resourceMap: { [key: string]: string };
	postId: string;
}

const DownloadMarkdown = ({
	markdown,
	resourceMap,
	postId,
}: DownloadMarkdownProps) => {
	const downloadMarkdown = useCallback(async () => {
		// Create a properly typed remark plugin
		const replaceResourcesPlugin: Plugin = () => (tree) => {
			// Handle images
			visit(tree, "image", (node: Image) => {
				const url = node.url;
				// Check if this URL is in our resourceMap (before any pipe character)
				const resourceId = url.split("|")[0];

				if (resourceMap[resourceId]) {
					// Replace the resource ID with the actual URL, dropping any properties
					node.url = resourceMap[resourceId];
				}
			});

			// Handle videos (which might be represented as links or in HTML)
			// @ts-ignore ignore for now
			visit(
				tree,
				["link", "html"],
				(node: Link | { type: "html"; value: string }) => {
					if (node.type === "link") {
						const url = node.url;
						const resourceId = url.split("|")[0];

						if (resourceMap[resourceId]) {
							node.url = resourceMap[resourceId];
						}
					} else if (node.type === "html") {
						// For HTML nodes, look for video tags or other media embeds
						let htmlContent = node.value;

						// Replace all resource IDs in src attributes
						Object.entries(resourceMap).forEach(([id, url]) => {
							const regex = new RegExp(`src=["']${id}(\\|[^"']*)?["']`, "g");
							htmlContent = htmlContent.replace(regex, `src="${url}"`);
						});

						node.value = htmlContent;
					}
				},
			);
		};

		try {
			// Process markdown with remark
			const processor = remark().use(replaceResourcesPlugin);
			const processedFile = await processor.process(markdown);
			const processedMarkdown = String(processedFile);

			// Create a blob with the processed markdown content
			const blob = new Blob([processedMarkdown], { type: "text/markdown" });

			// Create a URL for the blob
			const url = URL.createObjectURL(blob);

			// Create a temporary anchor element to trigger the download
			const a = document.createElement("a");
			a.href = url;
			a.download = `${postId}.md`;
			document.body.appendChild(a);
			a.click();

			// Clean up
			setTimeout(() => {
				document.body.removeChild(a);
				URL.revokeObjectURL(url);
			}, 100);
		} catch (error) {
			console.error("Error downloading markdown:", error);
		}
	}, [markdown, resourceMap, postId]);

	return (
		<CircleButton
			action={downloadMarkdown}
			iconSrc="/icons/download.svg"
			iconAlt="Download markdown"
		/>
	);
};

export default DownloadMarkdown;
