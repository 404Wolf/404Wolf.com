import CircleButton from "./CircleButton";

interface GotoEditorProps {
    postId: string;
    postType: string;
}

const GotoEditor = ({postId, postType}: GotoEditorProps) => {
    return (
        <CircleButton
            internalSrc={`/posts/${postType}/${postId}/editor`}
            iconSrc="/icons/edit.svg"
            iconAlt="Sync post with database button"
        />
    );
};

export default GotoEditor;
