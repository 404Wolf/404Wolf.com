import { pdfjs } from "react-pdf";
import EditablePdfDisplay from "@/components/displays/EditablePdfDisplay";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PDFPage = () => {
    return <EditablePdfDisplay pdfPath={process.env.NEXT_PUBLIC_RESUME_OBJECT_NAME!} />;
};

export default PDFPage;
