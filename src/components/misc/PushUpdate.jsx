import {useEffect, useState} from "react";
import CircleButton from "../posts/editor/CircleButton";

const PushUpdate = ({pushPostUpdates}) => {
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
        } else if (!updating && wheelRotation % 360 === 0) {
            clearInterval(rotationInterval);
            setRotationInterval(null);
        }
    }, [updating, wheelRotation]);

    const processUpdate = async () => {
        setUpdating(true);
        pushPostUpdates().then(() => setUpdating(false));
    };

    return (
        <div style={{rotate: `${wheelRotation}deg`}}>
            <CircleButton
                action={processUpdate}
                iconSrc="/icons/sync.svg"
                iconAlt="Update"
            />
        </div>
    );
};

export default PushUpdate;
