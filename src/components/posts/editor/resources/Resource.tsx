import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";
import ResourceField from "./Field";
import { resourceUrl } from "@/utils/aws";
import Modal from "@/components/misc/Modal";
import { EditorResource } from "@/pages/posts/[type]/[postId]/editor";

interface ResourceProps {
    resource: EditorResource;
    remove: () => void;
}

const Resource = ({ resource, remove }: ResourceProps) => {
    if (!resource) return <></>;

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
    };
    const resourceStateDependencies = Object.values(resourceStates).map((value) => value[0]);

    const resourceIdRef = useRef<HTMLDivElement>(null);

    const processUpdates = useCallback(() => {
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
            setCurrentId(requestBody.id);
            setCurrentUrl(resourceUrl(requestBody.filename));
            if (resourceIdRef.current) resourceIdRef.current.innerText = requestBody.id;
        });
    }, [resourceStateDependencies, currentId, currentUrl]);

    const updateGraphics = useCallback(() => {
        if (resourceIdRef.current) resourceIdRef.current.innerText = resourceStates.reference[0];
        if (resourceStates.type[0] === "markdown") {
            fetch(`/api/posts/resources/fetch`, { headers: { id: currentId, data: "true" } })
                .then((resp) => resp.json())
                .then((resp) =>
                    setPreview(
                        <div
                            style={{ width: "240px !important" }}
                            className="text-xs p-1 text-justify"
                            children={resp.resource.data.slice(0, 400)}
                        />
                    )
                );
        } else if (resourceStates.type[0] === "image")
            setPreview(
                <Image
                    src={currentUrl}
                    alt={
                        resourceStates.description[0] ||
                        `Image with id ${resourceStates.reference[0]}`
                    }
                    width={240}
                    height={240}
                    priority
                />
            );
    }, []);

    useEffect(() => {
        if (!removed) updateGraphics();
    }, [currentUrl]);

    return (
        <div className="relative">
            <button
                onClick={() => {
                    setRemoved(true);
                    remove();
                }}
            >
                <Image
                    src="/icons/close.svg"
                    className="z-50 bg-slate-400 rounded-full drop-shadow-xl hover:brightness-90 hover:scale-105 transition-all duration-200 ease-in-out absolute -bottom-1 -right-1"
                    alt="close"
                    width={24}
                    height={24}
                />
            </button>

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
                                <ResourceField
                                    key={1000}
                                    name="Id"
                                    startValue={resourceStates.reference[0]}
                                    setValue={resourceStates.reference[1]}
                                />
                                <ResourceField
                                    key={1001}
                                    name="Title"
                                    startValue={resourceStates.title[0]}
                                    setValue={resourceStates.title[1]}
                                />
                                <ResourceField
                                    key={1002}
                                    name="Filename"
                                    startValue={resourceStates.filename[0]}
                                    setValue={resourceStates.filename[1]}
                                />
                                <ResourceField
                                    key={1003}
                                    name="Type"
                                    startValue={resourceStates.type[0]}
                                    setValue={resourceStates.type[1]}
                                />
                            </div>
                        </div>
                        <div className="mt-3">
                            <ResourceField
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
