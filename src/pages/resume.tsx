import { GetServerSideProps } from "next";
import React, { useCallback, useState } from "react";
import { useRouter } from "next/router";
import StatusLayout from "@/layouts/StatusLayout";
import { resourceUrl } from "@/utils/aws";
import { useSession } from "next-auth/react";
import Tile from "@/components/misc/Tiles/Tile";
import MainLayout from "@/layouts/MainLayout";
import { useDropzone } from "react-dropzone";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import Tag from "@/components/misc/Tag";
import CircleButton from "@/components/posts/editor/CircleButton";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export const getServerSideProps: GetServerSideProps = async () => {
    return {
        // Resume is the object with env RESUME_OBJECT_NAME
        props: {
            pdfPath:
                resourceUrl(process.env.NEXT_PUBLIC_RESUME_OBJECT_NAME as string),
        },
    };
};

const PDFPage = ({ pdfPath }: { pdfPath: string }) => {
    const router = useRouter();
    const session = useSession();
    const [pdfKey, setPdfKey] = useState(0);

    const reloadPdf = useCallback(() => {
        // Change the key to force re-render.
        // Do this twice since we don't know how long AWS will take to update.
        setTimeout(() => setPdfKey((prevKey) => prevKey + 1), 1000);
        setTimeout(() => setPdfKey((prevKey) => prevKey + 1), 3000);
    }, []);

    const uploadResumeDrop = useCallback(
        (acceptedFiles: File[]) => {
            // Only possible for one file to be accepted, so choose the first one
            const file = acceptedFiles[0];
            console.log(file);

            file.arrayBuffer().then((buffer) => {
                // Make a post request to "/api/resume" to get a link that we can upload the new resume
                // to
                fetch("/api/resume", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                    .then((resp) => resp.json())
                    .then((data) => {
                        fetch(data.link, {
                            method: "PUT",
                            headers: {
                                "Content-Type": file.type,
                                "Content-Length": file.size.toString(),
                            },
                            body: buffer,
                        });
                    });
            });

            // Reload the PDF
            reloadPdf();
        },
        []
    );

    const { getRootProps } = useDropzone({
        onDrop: uploadResumeDrop,
    });

    if (session.status === "loading") {
        return <StatusLayout name="loading">Loading...</StatusLayout>;
    } else if (session.status === "authenticated") {
        return (
            <MainLayout title="Resume" header={false}>
                <div className="mt-3 pl-[10%] pr-[10%]">
                    <div className="-right-6 -top-6 absolute">
                        <CircleButton
                            externalSrc={pdfPath}
                            iconSrc="/icons/view.svg"
                            iconAlt="Go to current resume PDF"
                        />
                    </div>

                    <Tile>
                        <div className="pt-5">
                            <div {...getRootProps()} className="flex justify-center">
                                <Document
                                    file={pdfPath}
                                    key={pdfKey}
                                    className="relative cursor-copy"
                                >
                                    <Tag position="tl">Preview</Tag>
                                    <Page
                                        pageNumber={1}
                                        scale={0.7}
                                        renderAnnotationLayer={false}
                                        renderTextLayer={false}
                                    />
                                </Document>
                            </div>
                            <div
                                className="border-2 border-slate-300 p-1 absolute bottom-5 right-5 bg-white drop-shadow-md rounded-xl">
                                Drag new resume on top to replace
                            </div>
                        </div>
                    </Tile>
                </div>
            </MainLayout>
        );
    } else {
        // Redirect the user to the PDF file URL
        router.push(pdfPath);
    }
};

export default PDFPage;
