import { useState } from "react";
import CircleButton from "../posts/editor/CircleButton";

interface ToggleEditProps {
    isEditing: boolean;
    setIsEditing: (isEditing: boolean) => void;
}

const ToggleEdit = ({ isEditing, setIsEditing }: ToggleEditProps) => {
    return (
        <CircleButton
            action={() => setIsEditing(!isEditing)}
            iconSrc="/icons/edit.svg"
            iconAlt="Edit"
        />
    );
};

export default ToggleEdit;
