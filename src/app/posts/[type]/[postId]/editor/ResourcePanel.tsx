import Resources from "@/components/posts/editor/resources/Resources";
import { EditorResource } from "./page";

export interface ResourcePanelProps {
    resources: EditorResource[];
    setResources: (resources: EditorResource[]) => void;
    covers: string[];
    setCovers: (covers: string[]) => void;
    postId: string;
    setMarkdown: (markdownData: string, markdownId: string) => void;
}

export default function ResourcePanel({resources, setResources, covers, setCovers, postId, setMarkdown}: ResourcePanelProps) {
    return (
        <div className="overflow-y-auto overflow-x-visible px-5 pb-5">
            <Resources
                resources={resources}
                covers={covers}
                setResources={setResources}
                setCovers={setCovers}
                postId={postId}
                setMarkdown={setMarkdown}
            />
        </div>
    )
}