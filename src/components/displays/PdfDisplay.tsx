import { Document, Page } from "react-pdf";
import Tag from "../misc/Tag";

export default function PdfDisplay({ pdfPath }: { pdfPath: string }) {
    return (
        <div className="flex justify-center">
            <Document file={pdfPath} className="relative cursor-copy">
                <Tag position="tl">Preview</Tag>
                <Page
                    pageNumber={1}
                    scale={0.7}
                    renderAnnotationLayer={false}
                    renderTextLayer={false}
                />
            </Document>
        </div>
    );
}
