import { EditorResource } from "@/pages/posts/[type]/[postId]/editor";
import Resource, { ResourceStates } from "@/components/posts/editor/resources/Resource";
import { useCallback, useState, useTransition } from "react";
import { useDropzone, DropEvent, FileRejection } from "react-dropzone";
import FakeResource from "./FakeResource";
import ensureLength from "@/utils/ensureLength";
import { toB64 } from "@/utils/toB64";
import { resourceUrl } from "@/utils/aws";
import sanitize from "sanitize-filename";

interface ResourcesProps {
    resources: EditorResource[];
    setResources: (resources: EditorResource[]) => void;
    postId: string;
    setMarkdown: (markdownData: string, markdownId: string) => void;
}

const Resources = ({ resources, setResources, postId, setMarkdown }: ResourcesProps) => {
    const [mutatingResources, mutateResourcesTransition] = useTransition();
    const mutateResources = useCallback((resources: EditorResource[]) => {
        mutateResourcesTransition(() => setResources(resources));
    }, []);

    const addResource = useCallback(
        async (acceptedFiles: File[], fileRejections: FileRejection[], event: DropEvent) => {
            if (mutatingResources) return;

            const newResources: EditorResource[] = [];
            for (const file of acceptedFiles) {
                let [filename, filetype] = file.name.split(".");

                // Doesn't include file extension
                const resourceName = sanitize(filename).replace("%20", "_").replace(/\s/g, "_");

                const makeId = (counter: number) =>
                    `${resourceName}_${ensureLength(String(counter), 4)}`;

                let resourceNumber = 1;
                while (
                    (await fetch("/api/resources/exists", {
                        headers: { id: makeId(resourceNumber) },
                    })
                        .then((resp) => resp.json())
                        .then((exists) => exists.exists)) === "true"
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

                    data: ((await toB64(file)) as string).replace(/^data:image\/\w+;base64,/, ""),
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
                    .then((resp) => {
                        if (resp.ok)
                            newResources.push({ ...newResource, url: resourceUrl(filename) });
                    })
                    .catch((e) => console.log(e));
            }

            mutateResources(
                [...resources, ...newResources].filter(
                    (resource) => resource !== null && resource !== undefined
                )
            );
        },
        [resources]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: addResource,
    });

    const removeResource = useCallback(
        (index: number) => {
            if (mutatingResources) return;

            fetch(`/api/resources/${resources[index].id}`, {
                method: "DELETE",
            }).then((resp) => {
                if (resp.ok || resp.status === 404) {
                    const slicedResources = [...resources];
                    delete slicedResources[index];
                    mutateResources(slicedResources);
                }
            });
        },
        [resources]
    );

    const updateResource = useCallback(
        async (index: number, newResource: EditorResource) => {
            const oldResource = resources[index];
            console.log(oldResource, newResource, resources, index);
            if (mutatingResources) return oldResource;

            await fetch(`/api/resources/${oldResource.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newResource),
            }).then((resp) => {
                if (resp.ok) {
                    const newResources = [...resources];
                    newResources[index] = newResource;

                    mutateResources(newResources);
                }
            });
            return oldResource;
        },
        [resources]
    );

    return (
        <div className="h-full">
            <div className="grid grid-cols-2 gap-3 mt-4 justify-stretch relative">
                {resources.map((resource, index) => {
                    return (
                        <Resource
                            index={index}
                            remove={() => removeResource(index)}
                            resource={resource}
                            updateResource={updateResource}
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
        </div>
    );
};

export default Resources;
