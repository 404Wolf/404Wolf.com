import Image from "next/image";
import { useEffect, useState, useTransition } from "react";
import CircleButton from "./CircleButton";

const UpdatePost = ({ pushUpdates }) => {
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
            if (wheelRotation % 360 === 0) {
                clearInterval(rotationInterval);
                setRotationInterval(null);
            }
        }
    }, [updating, wheelRotation]);

    const processUpdate = async () => {
        setUpdating(true);
        pushUpdates();
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
