"use client";

import { useCallback, useState } from "react";

const usePushPostUpdates = (postStates, currentId, callback) => {
	const [resourceUpdateQueue, setResourceUpdateQueue] = useState([]);

	const updatePost = useCallback(
		async () => {
			const requestBody = {
				id: postStates.id[0],
				title: postStates.title[0],
				description: postStates.description[0],
				markdown: {
					id: postStates.markdownId[0],
					data: postStates.markdownData[0],
				},
				covers: postStates.covers[0],
				type: postStates.type[0],
				date: postStates.date[0], // Update with the desired value
				tags: postStates.tags[0], // Update with the desired value
				notes: postStates.notes[0], // Update with the desired value
			};
			console.log("Request body:", requestBody);

			try {
				const response = await fetch(`/api/posts/${currentId}`, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(requestBody),
				});
				if (response.ok) {
					const data = await response.json();
				} else {
					console.log("Error:", response.statusText);
				}
			} catch (error) {
				console.log("An error occurred while updating the post:", error);
			}
		},
		Object.values(postStates).map((postState) => postState[0]),
	);

	return async () =>
		updatePost().then(() => {
			resourceUpdateQueue.forEach((func) => func());
			setResourceUpdateQueue([]);
			callback();
		});
};

export default usePushPostUpdates;
