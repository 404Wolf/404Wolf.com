import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";
import Field from "../Field";
import { resourceUrl } from "@/utils/aws";
import Modal from "@/components/misc/Modal";
import { EditorPost, EditorResource } from "@/pages/posts/[type]/[postId]/editor";
import ResourceIcon from "./Icon";
import Link from "next/link";
import { useRouter } from "next/router";

interface ResourceProps {
    resource: EditorResource;
    postId: string;
    remove: () => void;
    setMarkdown: (markdownData: string, markdownId: string) => void;
    pushUpdate: () => void;
}

const Resource = ({ resource, postId, remove, setMarkdown, pushUpdate }: ResourceProps) => {
    if (!resource) return <></>;

    const router = useRouter();

    const [removed, setRemoved] = useState(false);
    const [preview, setPreview] = useState<null | React.ReactNode>(null);
    const [configOpen, setConfigOpen] = useState(false);

    const [currentUrl, setCurrentUrl] = useState(resource.url);
    const [currentId, setCurrentId] = useState(resource.ref);
    const resourceStates = {
        reference: useState(resource.ref),
        title: useState(resource.title),
        filename: useState(resource.filename),
        type: useState(resource.type),
        description: useState(resource.description),
        cover: useState(false),
    };
    const resourceStateDependencies = Object.values(resourceStates).map((value) => value[0]);

    const resourceIdRef = useRef<HTMLDivElement>(null);

    const processUpdates = useCallback(() => {
        if (resourceStates.reference[0] !== currentId)
            fetch("/api/posts/update", {
                method: "PUT",
                headers: { id: postId },
                body: `{ markdown: ${currentId} }`,
            }).then((resp) => {
                if (resp.ok) {
                    const requestBody = {
                        id: resourceStates.reference[0],
                        title: resourceStates.title[0],
                        filename: resourceStates.filename[0],
                        type: resourceStates.type[0],
                        description: resourceStates.description[0],
                    };
                    fetch("/api/posts/resources/update", {
                        method: "PUT",
                        headers: { id: currentId },
                        body: JSON.stringify(requestBody),
                    }).then((resp) => {
                        if (resp.ok) {
                            setCurrentId(requestBody.id);
                            setCurrentUrl(resourceUrl(requestBody.filename));
                            if (resourceIdRef.current)
                                resourceIdRef.current.innerText = requestBody.id;
                            pushUpdate();
                        }
                    });
                }
            });
    }, [resourceStateDependencies, currentId, currentUrl]);

    useEffect(() => {
        if (resourceIdRef.current) resourceIdRef.current.innerText = resourceStates.reference[0];
        switch (resourceStates.type[0]) {
            case "image":
                setPreview(
                    <Image
                        src={currentUrl}
                        alt={
                            resourceStates.description[0] ||
                            `Image with id ${resourceStates.reference[0]}`
                        }
                        width={340}
                        height={240}
                        priority
                    />
                );
                return;
            case "markdown":
                setPreview(
                    <Image
                        src="/icons/edit.svg"
                        alt={
                            resourceStates.description[0] ||
                            `Image with id ${resourceStates.reference[0]}`
                        }
                        width={340}
                        height={240}
                        className="mx-auto my-auto translate-x-1 lg:-translate-y-7  scale-[60%]"
                        priority
                    />
                );
                return;
        }
    }, [currentUrl]);

    const loadMarkdown = useCallback(() => {
        const reqBody = { markdown: currentId };
        fetch("/api/posts/resources/update", {
            headers: { id: currentId },
            method: "PUT",
            body: JSON.stringify(reqBody),
        }).then((resp) => {
            if (resp.ok) {
                fetch(`/api/posts/resources/fetch`, { headers: { id: currentId, data: "true" } })
                    .then((resp) => resp.json())
                    .then((resp) => resp.resource.data)
                    .then((markdown) => setMarkdown(markdown, currentId));
            }
        });
        pushUpdate();
    }, [currentId]);

    const downloadResource = useCallback(() => {
        fetch("/api/posts/resources/link", { headers: { id: currentId } })
            .then((resp) => resp.json())
            .then((resp) => router.push(resp.url));
    }, [currentId]);

    return (
        <div className="relative">
            <div className="flex gap-1 absolute -bottom-1 -right-1">
                {resourceStates.type[0] === "markdown" && (
                    <button onClick={loadMarkdown}>
                        <ResourceIcon icon="load" alt="Load markdown" />
                    </button>
                )}
                <button onClick={downloadResource}>
                    <ResourceIcon icon="download" alt="Download resource" />
                </button>
                <button
                    onClick={() => {
                        setRemoved(true);
                        remove();
                    }}
                >
                    <ResourceIcon icon="trash" alt="Delete resource" />
                </button>
            </div>

            <button onClick={() => setConfigOpen(true)}>
                <div className="bg-gray-500 text-sm text-white flex my-2 py-px px-2 w-fit mx-auto rounded-full absolute -top-4 -left-4 focus:outline-none scale-90">
                    <div className="inline-block">#</div>
                    <div contentEditable={true} ref={resourceIdRef} />
                </div>
                <div className="bg-gray-400 rounded-xl h-36 overflow-clip">{preview}</div>
            </button>

            <Modal
                open={configOpen}
                setOpen={setConfigOpen}
                onClose={processUpdates}
                positioning="-top-1 -right-[3px]"
            >
                <div>
                    <h1 className="bg-gray-700 text-2xl text-white rounded-2xl w-fit px-2 py-px absolute -top-3 -left-3 z-50">
                        Resource Editor
                    </h1>
                    <div
                        style={{ zIndex: -20 }}
                        className="p-4 bg-slate-300 pt-8 flex-row rounded-2xl drop-shadow-5xl-c"
                    >
                        <div className="flex gap-3">
                            <div className="bg-gray-400 h-44 w-60 overflow-hidden rounded-xl">
                                {preview}
                            </div>

                            <div className="flex flex-col gap-5">
                                <Field
                                    key={1000}
                                    name="Id"
                                    startValue={resourceStates.reference[0]}
                                    setValue={resourceStates.reference[1]}
                                />
                                <Field
                                    key={1001}
                                    name="Title"
                                    startValue={resourceStates.title[0]}
                                    setValue={resourceStates.title[1]}
                                />
                                <Field
                                    key={1002}
                                    name="Filename"
                                    startValue={resourceStates.filename[0]}
                                    setValue={resourceStates.filename[1]}
                                />
                                <Field
                                    key={1003}
                                    name="Type"
                                    startValue={resourceStates.type[0]}
                                    setValue={resourceStates.type[1]}
                                />
                            </div>
                        </div>
                        <div className="mt-3">
                            <Field
                                name="Description"
                                key={1004}
                                startValue={resourceStates.description[0]}
                                setValue={resourceStates.description[1]}
                                tall={true}
                                height="110px"
                            />
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default Resource;
