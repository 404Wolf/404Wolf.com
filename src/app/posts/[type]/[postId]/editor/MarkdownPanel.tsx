import Markdown from "@/markdown/Markdown";

export default function MarkdownPanel({
  currentMarkdown,
  resourceMap,
}: {
  currentMarkdown: string;
  resourceMap: Record<string, string>;
}) {
  return (
    <div className="-mt-4 overflow-y-auto overflow-x-clip px-5 pb-5">
      <Markdown markdown={currentMarkdown} resourceMap={resourceMap} />
    </div>
  );
}
