import { useCallback, useState } from "react";

const usePushPostUpdates = (postStates) => {
    const [resourceUpdateQueue, setResourceUpdateQueue] = useState([])

    const updatePost = useCallback(async () => {
        const url = "/api/posts/update";
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

        const requestOptions = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                id: postStates.id[0],
            },
            body: JSON.stringify(requestBody),
        };

        try {
            const response = await fetch(url, requestOptions);
            if (response.ok) {
                const data = await response.json();
                console.log(data); // Post successfully added
            } else {
                console.log("Error:", response.statusText);
            }
        } catch (error) {
            console.log("An error occurred while updating the post:", error);
        }
    }, Object.values(postStates).map(postState => postState[0]))

    return {
        pushUpdates: () => {
            resourceUpdateQueue.forEach(func => func());
            setResourceUpdateQueue([])
            updatePost()
        },
        pushToQueue: (func) => setResourceUpdateQueue([...resourceUpdateQueue, func])
    }
}

export default usePushPostUpdates;