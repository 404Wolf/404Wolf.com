"use client";

import { useCallback, useState } from "react";
import PdfDisplay from "./PdfDisplay";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useDropzone } from "react-dropzone";
import StatusLayout from "@/layouts/StatusLayout";
import MainLayout from "@/layouts/MainLayout";
import CircleButton from "../posts/editor/CircleButton";
import Tile from "../misc/Tiles/Tile";
import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function EditablePdfDisplay({ pdfPath }: { pdfPath: string }) {
	const router = useRouter();
	const session = useSession();
	const [pdfKey, setPdfKey] = useState(0);

	const reloadPdf = useCallback(() => {
		// Change the key to force re-render.
		// Do this twice since we don't know how long AWS will take to update.
		setTimeout(() => setPdfKey((prevKey: number) => prevKey + 1), 1000);
		setTimeout(() => setPdfKey((prevKey: number) => prevKey + 1), 3000);
	}, []);

	const uploadResumeDrop = useCallback((acceptedFiles: File[]) => {
		// Only possible for one file to be accepted, so choose the first one
		const file = acceptedFiles[0];

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
					console.log("Uploading resume...");
					fetch(data.link, {
						method: "PUT",
						headers: {
							"Content-Type": file.type,
							"Content-Length": file.size.toString(),
						},
						body: buffer,
					});
					console.log("Resume uploaded.");
				});
		});

		// Reload the PDF
		reloadPdf();
	}, []);

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
						<div className="p-5">
							<div {...getRootProps()} className="flex justify-center">
								<PdfDisplay key={pdfKey} pdfPath={pdfPath} />
							</div>
							<div className="border-2 border-slate-300 p-1 absolute bottom-5 right-5 bg-white drop-shadow-md rounded-xl">
								Drag new resume on top to replace
							</div>
						</div>
					</Tile>
				</div>
			</MainLayout>
		);
	} else {
		router.push(pdfPath);
	}
}
