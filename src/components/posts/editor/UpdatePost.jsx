import Image from "next/image";
import { useEffect, useState, useTransition } from "react";

const UpdatePost = ({ postStates }) => {
    const [isUpdating, startUpdate] = useTransition();
    const [wheelRotation, setWheelRotation] = useState(0);
    const [rotationInterval, setRotationInterval] = useState();

    useEffect(() => {
        if (isUpdating) {
            setRotationInterval(
                setInterval(
                    setWheelRotation((wheelRotation) => wheelRotation + 6),
                    2
                )
            );
        } else {
            clearInterval(rotationInterval);
            setRotationInterval(null);
        }
    }, [isUpdating]);

    const processUpdate = async () => {
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
    };

    return (
        <div
            className="bg-gray-700 rounded-full"
            style={{ rotate: `${wheelRotation}deg` }}
            
        >
            <button disabled={isUpdating} onClick={() => startUpdate(processUpdate)} className="p-2">
                <Image src="/icons/sync.svg" width={60} height={60} />
            </button>
        </div>
    );
};

export default UpdatePost;
