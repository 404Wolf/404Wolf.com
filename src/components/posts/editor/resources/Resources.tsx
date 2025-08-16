import Resource from "@/components/posts/editor/resources/Resource";
import { useCallback } from "react";
import { DropEvent, FileRejection, useDropzone } from "react-dropzone";
import FakeResource from "./FakeResource";
import ensureLength from "@/utils/ensureLength";
import s3 from "@/utils/aws";
import sanitize from "sanitize-filename";
import { EditorResource } from "@/app/posts/[type]/[postId]/editor/page";

interface ResourcesProps {
	resources: EditorResource[];
	covers: string[];
	setResources: (resources: EditorResource[]) => void;
	setCovers: (covers: string[]) => void;
	postId: string;
	setMarkdown: (markdownData: string, markdownId: string) => void;
}

const Resources = ({
	resources,
	covers,
	setResources,
	setCovers,
	postId,
	setMarkdown,
}: ResourcesProps) => {
	const addResource = useCallback(
		async (
			acceptedFiles: File[],
			fileRejections: FileRejection[],
			event: DropEvent,
		) => {
			const newResources: EditorResource[] = [];
			for (const file of acceptedFiles) {
				let [filename, filetype] = file.name.split(".");

				// Doesn't include file extension
				const resourceName = sanitize(filename)
					.replace("%20", "_")
					.replace(/\s/g, "_");

				const makeId = (counter: number) =>
					`${resourceName}_${ensureLength(String(counter), 4)}`;

				// Find a resource ID that is not used
				let resourceNumber = 1;
				while (
					(await fetch(`/api/resources/${makeId(resourceNumber)}/exists`)
						.then((resp) => resp.json())
						.then((exists) => exists.exists)) === true
				) {
					resourceNumber++;
				}
				const resourceId = makeId(resourceNumber);

				filename = `${resourceId}.${filetype}`;

				const newResource = {
					id: resourceId,
					title: resourceName,
					filename: filename,
					type: file.type.split("/")[0],
					description: "",
					mimetype: file.type,
					postId: postId,
				};
				await fetch(`/api/resources/${resourceId}`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(newResource),
				})
					.then(async (addResp) => {
						const addRespJson = await addResp.json();
						const uploadResp = await fetch(addRespJson.uploadUrl, {
							method: "PUT",
							headers: {
								"Content-Type": file.type,
								"Content-Length": file.size.toString(),
							},
							body: await file.arrayBuffer(),
						});
						if (uploadResp.ok) {
							newResources.push({
								...newResource,
								url: s3.resourceUrl(filename),
							});
						}
					})
					.catch((e) => console.log(e));
			}

			setResources(
				[...resources, ...newResources].filter(
					(resource) => resource !== null && resource !== undefined,
				),
			);
		},
		[resources, postId],
	);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop: addResource,
	});

	const removeResource = useCallback(
		(resourceId: string) => {
			fetch(`/api/resources/${resourceId}`, {
				method: "DELETE",
			}).then((resp) => {
				if (resp.ok || resp.status === 404) {
					setResources(
						resources.filter((resource) => resource.id !== resourceId),
					);
				}
			});
		},
		[resources],
	);

	const updateResource = useCallback(
		async (resourceId: string, newResource: EditorResource) => {
			await fetch(`/api/resources/${resourceId}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newResource),
			}).then((resp) => {
				if (resp.ok) {
					setResources([...resources]);
				}
			});
		},
		[resources],
	);

	const makeCover = useCallback(
		(resourceId: string) => {
			console.log(`Making ${resourceId} a cover.`);
			const newCovers = new Set([...covers, resourceId]);
			setCovers(Array.from(newCovers));
		},
		[covers, postId],
	);

	const removeCover = useCallback(
		(resourceId: string) => {
			console.log(`Making ${resourceId} not a cover anymore.`);
			const newCovers = new Set(covers);
			try {
				newCovers.delete(resourceId);
			} catch {}
			setCovers(Array.from(newCovers));
		},
		[covers, postId],
	);

	return (
		<div className="grid grid-cols-2 gap-3 mt-4 justify-stretch relative">
			{resources.map((resource, index) => {
				return (
					<Resource
						index={index}
						remove={() => removeResource(resource.id)}
						resource={resource}
						isCover={() => covers.includes(resource.id)}
						toggleIsCover={() =>
							covers.includes(resource.id)
								? removeCover(resource.id)
								: makeCover(resource.id)
						}
						updateResource={(newResource) =>
							updateResource(resource.id, newResource)
						}
						setMarkdown={setMarkdown}
						postId={postId}
						key={index}
					/>
				);
			})}
			<div
				{...getRootProps()}
				className={`relative cursor-pointer ${
					isDragActive ? "brightness-90" : "brightness-100"
				}`}
			>
				<FakeResource placeholderId={null}></FakeResource>
			</div>
		</div>
	);
};

export default Resources;
