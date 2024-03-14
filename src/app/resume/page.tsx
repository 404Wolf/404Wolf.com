"use client";

import { pdfjs } from "react-pdf";
import { useSession } from "next-auth/react";
import EditablePdfDisplay from "@/components/displays/EditablePdfDisplay";
import { redirectToResume } from "./utils";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PDFPage = () => {
    const session = useSession({
        required: true,
        onUnauthenticated() {
            redirectToResume();
        }
    });

    return <EditablePdfDisplay pdfPath={process.env.NEXT_PUBLIC_RESUME_OBJECT_NAME!} />
};

export default PDFPage;
