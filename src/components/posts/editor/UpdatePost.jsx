import Image from "next/image";
import { useEffect, useState, useTransition } from "react";
import CircleButton from "./CircleButton";

const UpdatePost = ({ postStates }) => {
    const [updating, setUpdating] = useState();
    const [wheelRotation, setWheelRotation] = useState(0);
    const [rotationInterval, setRotationInterval] = useState(null);

    useEffect(() => {
        if (updating && rotationInterval === null) {
            const interval = setInterval(
                () => setWheelRotation((wheelRotation) => wheelRotation - 2),
                4
            );
            setRotationInterval(interval);
        } else {
            if ((wheelRotation % 360) === 0) {
                clearInterval(rotationInterval);
                setRotationInterval(null);
            }
        }
    }, [updating, wheelRotation]);

    const processUpdate = async () => {
        setUpdating(true);

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

        setUpdating(false);
    };

    return (
        <div style={{ rotate: `${wheelRotation}deg` }}>
            <CircleButton
                action={processUpdate}
                iconSrc="/icons/sync.svg"
                iconAlt="Sync post with database button"
            />
        </div>
    );
};

export default UpdatePost;
