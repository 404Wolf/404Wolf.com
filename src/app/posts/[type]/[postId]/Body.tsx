"use client";

import Tile from "@/components/misc/Tiles/Tile";
import Tags from "@/components/posts/Tags";
import DeletePost from "@/components/posts/editor/DeletePost";
import GotoEditor from "@/components/posts/editor/GotoEditor";
import Markdown from "@/markdown/Markdown";
import { Resource } from "@prisma/client";
import { useWindowWidth } from "@react-hook/window-size";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useMemo } from "react";

export default function Body({
  cover,
  postId,
  type,
  title,
  description,
  tags,
  markdown,
  resources,
}: {
  cover: string;
  postId: string;
  type: string;
  title: string;
  description: string;
  tags: string[];
  markdown: string;
  resources: { [key: string]: string };
}) {
  const session = useSession();
  const windowWidth = useWindowWidth({ wait: 100, leading: true });

  const markdownArea = useMemo(() => {
    return <Markdown addContents={true} markdown={markdown} resourceMap={resources} />;
  }, []);

  return (
    <div className="mt-[12px] overflow-visible">
      {session.status === "authenticated" && (
        <div className="absolute -top-12 -right-4 scale-[90%] flex gap-3">
          <DeletePost postId={postId} postType={type} />
          <div className="hidden sm:block">
            <GotoEditor postId={postId} postType={type} />
          </div>
        </div>
      )}

      <Tile title="Overview" direction="right">
        <div className="h-fit overflow-auto">
          {cover && (
            <div className="relative pointer-events-none rounded-xl w-2/5 sm:w-1/4 sm:mt-4 sm:ml-2 float-right">
              <div className="max-h-[15rem] overflow-clip border-4 border-slate-500 rounded-xl">
                <Image
                  width={400}
                  height={400}
                  src={cover}
                  className="rounded-xl scale-[103%]"
                  alt={`${title}'s cover image`}
                />
              </div>
            </div>
          )}
          <div className="-mt-1 mb-2 sm:mb-1 text-[17px] sm:text-[1.4em]">
            {description}
          </div>
        </div>
      </Tile>

      <div className="brightness-[125%] absolute left-2 -translate-y-6 z-50">
        <Tags tags={tags} readOnly={true} />
      </div>

      <div className="m-6" />

      <Tile
        className="overflow-auto"
        title={windowWidth > 500 ? (title ? title : undefined) : undefined}
        direction="right"
      >
        <div className="-mt-4 xl:px-[14%]" key={44}>
          {markdownArea}
        </div>
      </Tile>
    </div>
  );
}
