import { useEffect, useState } from "react";
import CircleButton from "./CircleButton";

const UpdatePost = ({ postUpdateHook }) => {
    const [updating, setUpdating] = useState();
    const [wheelRotation, setWheelRotation] = useState(0);
    const [rotationInterval, setRotationInterval] = useState(null);

    useEffect(() => {
        if (updating && rotationInterval === null) {
            const interval = setInterval(
                () => setWheelRotation((wheelRotation) => wheelRotation - 2),
                2
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
        postUpdateHook.pushToQueue(() => setUpdating(false));
        postUpdateHook.pushUpdates();
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
