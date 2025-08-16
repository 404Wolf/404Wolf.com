import CircleButton from "./CircleButton";

interface GotoViewerProps {
	postId: string;
	postType: string;
}

const GoToViewer = ({ postId, postType }: GotoViewerProps) => {
	return (
		<CircleButton
			internalSrc={`/posts/${postType}/${postId}`}
			iconSrc="/icons/view.svg"
			iconAlt="Sync post with database button"
		/>
	);
};

export default GoToViewer;
