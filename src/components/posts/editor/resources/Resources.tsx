import { EditorResource } from "@/pages/posts/[type]/[postId]/editor";
import Resource from "@/components/posts/editor/resources/Resource";
import { useCallback, useState } from "react";
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
    const addResource = useCallback(
        async (acceptedFiles: File[], fileRejections: FileRejection[], event: DropEvent) => {
            let newResources = [];
            for (const file of acceptedFiles) {
                let [filename, filetype] = file.name.split(".");
                const resourceName = sanitize(filename).replace("%20", "_").replace(/\s/g, "_");

                const makeId = (number: number) =>
                    `${resourceName}_${ensureLength(String(number), 4)}`;

                let resourceNumber = 1;
                while (
                    (await fetch("/api/posts/resources/exists", {
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
                    ref: resourceId,
                    title: resourceName,
                    filename: filename,
                    type: file.type.split("/")[0],
                    description: "",
                    url: resourceUrl(filename),
                    data: ((await toB64(file)) as string).replace(/^data:image\/\w+;base64,/, ""),
                    mimetype: file.type,
                    postId: postId,
                };
                console.log(newResource);
                fetch("/api/posts/resources/add", {
                    method: "POST",
                    headers: { id: resourceId },
                    body: JSON.stringify(newResource),
                });

                newResources.push(newResource);
            }

            setResources(
                [...resources, ...newResources].filter(
                    (resource) => resource !== null && resource !== undefined
                )
            );
        },
        []
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: addResource,
    });

    const removeResource = useCallback(
        async (index: number) => {
            const resource = resources[index];
            const resp = await fetch("/api/posts/resources/remove", {
                headers: { id: resource.ref },
                method: "DELETE",
            });

            if (resp.ok) {
                const slicedResources = [...resources];
                delete slicedResources[index];
                setResources(slicedResources);
            }
        },
        [resources]
    );

    const pushUpdate = useCallback(() => {
        fetch("/api/posts/resources", { headers: { id: postId } })
            .then((resp) => resp.json())
            .then((resp) => {
                console.log(resp.resources);
                return resp.resources;
            })
            .then(setResources);
    }, []);

    return (
        <div className={`h-full ${isDragActive ? "brightness-90" : "brightness-100"}`}>
            <div className="grid grid-cols-2 gap-3 mt-4 relative">
                {resources.map((resource, index) => {
                    return (
                        <Resource
                            remove={() => removeResource(index)}
                            resource={resource}
                            pushUpdate={pushUpdate}
                            setMarkdown={setMarkdown}
                            postId={postId}
                            key={index}
                        />
                    );
                })}
                <div {...getRootProps()} className="relative cursor-pointer">
                    <FakeResource placeholderId={null}></FakeResource>
                </div>
            </div>
        </div>
    );
};

export default Resources;
