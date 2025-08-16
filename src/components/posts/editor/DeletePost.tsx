"use client";

import { useCallback } from "react";
import CircleButton from "./CircleButton";
import { useRouter } from "next/navigation";

interface DeletePostProps {
	postId: string;
	postType: string;
}

const DeletePost = ({ postId, postType }: DeletePostProps) => {
	const router = useRouter();

	const deletePost = useCallback(() => {
		fetch(`/api/posts/${postId}`, {
			method: "DELETE",
		}).then((resp) => {
			if (resp.ok) {
				router.push(`/posts/${postType}s`);
			}
		});
	}, [postId]);

	return (
		<CircleButton
			action={deletePost}
			iconSrc="/icons/trash.svg"
			iconAlt="Delete post"
		/>
	);
};

export default DeletePost;
