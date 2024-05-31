"use client";

import Head from "next/head";
import MainLayout from "@/layouts/MainLayout";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import Restricted from "@/layouts/Restricted";
import { useRouter } from "next/navigation";
import PushUpdate from "@/components/misc/PushUpdate";
import Tags from "@/components/posts/Tags";
import GoToViewer from "@/components/posts/editor/GoToViewer";
import Tile from "@/components/misc/Tiles/Tile";
import TabTile, { ShowTabTile } from "@/components/misc/Tiles/Tabs";
import usePushPostUpdates from "@/utils/usePushPostUpdates";
import Field from "@/components/posts/editor/Field";
import DeletePost from "@/components/posts/editor/DeletePost";
import TextareaAutosize from "react-textarea-autosize";
import type { Resource } from "@prisma/client";
import MarkdownPanel from "./MarkdownPanel";
import ResourcePanel from "./ResourcePanel";

interface EditorAreaProps {
  postId: string;
  title: string;
  type: string;
  tags: string[];
  description: string;
  markdownId: string;
  markdownData: string;
  covers: string[];
  date: string;
  notes: string;
  resources: Resource[];
}

export function EditorArea({
  postId,
  title,
  type,
  tags,
  description,
  markdownId,
  markdownData,
  covers,
  date,
  notes,
  resources,
}: EditorAreaProps) {
  const session = useSession();
  const router = useRouter();

  // Ensure that the user is authenticated or reroute them back to the post.
  useEffect(() => {
    if (session.status === "unauthenticated")
      router.push(`/posts/${type}/${postId}`);
  }, []);

  // All of the current resource objects. If this is updated then on the next user save action
  // these will be dumped to the database.
  const [currentResources, setCurrentResources] = useState(
    resources as Resource[],
  );

  // Whether to show the resources tab on the right side (true) or to only show the markdown area
  // (false).
  const [showTabTile, setShowTabTile] = useState(true);

  // All of the states that pertain to the post specifically, with the exception of the
  // resources of the post or some high level metadata like the ID of the post. When these
  // are updated then on the next save action these will be dumped to the databases to
  // update the actual post object.
  const postStates = {
    id: useState(postId),
    title: useState(title),
    type: useState(type),
    tags: useState(tags),
    description: useState(description),
    markdownId: useState(markdownId),
    markdownData: useState(markdownData),
    covers: useState(covers),
    date: useState(date),
    notes: useState(notes),
  };

  // We need to store the actual ID of the post before changes were made, so that if the user
  // changes the ID of the post we can actually send the update.
  const [currentPostId, setCurrentPostId] = useState(postId);
  const [currentPostType, setCurrentPostType] = useState(type);

  const pushPostUpdates = usePushPostUpdates(postStates, currentPostId, () => {
    setCurrentPostId(postStates.id[0]);
    setCurrentPostType(postStates.type[0]);
  });

  // For displaying images we need a mapping of the ID of the images to the URL of the images.
  // This is computed and then regenerated whenever the current resources in the panel change.
  const resourceMap = useMemo(() => {
    const newResourceMap: { [key: string]: string } = {};
    for (const resource of currentResources) {
      if (resource) newResourceMap[resource.id] = resource.url;
    }
    return newResourceMap;
  }, [currentResources]);

  // The reference to the markdown area so that we can update the markdown area when the user
  // adds a new markdown resource.
  const postMarkdownAreaRef = useRef<HTMLTextAreaElement>(null);

  return (
    <Restricted>
      <>
        <Head>
          <title>Post Editor</title>
        </Head>
        <MainLayout
          title={postStates.title[0]}
          editableTitle={true}
          onTitleEdit={(newTitle) => postStates.title[1](newTitle)}
          header={false}
          containerClasses="sm:-ml-4 lg:-mr-[7%] lg:-ml-[7%] xl:-mr-[12%] xl:-ml-[12%]"
        >
          <div className="absolute -top-6 right-0 flex gap-1">
            <Tags tags={postStates.tags[0]} setTags={postStates.tags[1]} />
            <div className="-translate-y-6 scale-[90%] -mr-1">
              <GoToViewer
                postId={postStates.id[0]}
                postType={postStates.type[0]}
              />
            </div>
            <div className="-translate-y-6 scale-[90%]">
              <DeletePost postId={currentPostId} postType={currentPostType} />
            </div>
            <div className="-translate-y-6 scale-[90%]">
              <PushUpdate pushPostUpdates={pushPostUpdates} />
            </div>
          </div>

          <div className="mt-[12px] overflow-visible">
            <div className="flex mb-4 md:mb-6 gap-4">
              <Tile
                containerClass="relative w-1/4"
                title="Config"
                direction="left"
                className="mb-6"
                type={false}
              >
                <div className="flex-col pt-2">
                  <Field
                    name="Date"
                    nontallWidth="w-full"
                    border={false}
                    startValue={date}
                    setValue={postStates.date[1]}
                  />
                  <div className="mt-4" />
                  <Field
                    name="Type"
                    nontallWidth="w-full"
                    border={false}
                    startValue={type}
                    setValue={postStates.type[1]}
                  />
                  <div className="mt-4" />
                  <Field
                    name="Notes"
                    tall={true}
                    border={false}
                    startValue={notes}
                    setValue={postStates.notes[1]}
                  />
                </div>
              </Tile>

              <Tile
                containerClass="relative w-3/4"
                title="Overview"
                direction="left"
                className="mb-6 pt-1"
                type={false}
              >
                <TextareaAutosize
                  onResize={(e) => {}}
                  onChange={(e) => postStates.description[1](e.target.value)}
                  defaultValue={postStates.description[0]}
                  className="h-fit w-full bg-transparent overflow-hidden resize-none focus:outline-none"
                />
              </Tile>
            </div>

            <div className="md:flex md:gap-4 relative">
              <div
                hidden={showTabTile}
                className="absolute -right-5 -top-5 scale-75 z-50"
              >
                <ShowTabTile shown={showTabTile} setShown={setShowTabTile} />
              </div>

              <div className="absolute left-[127px] -top-3 z-50 text-sm px-[3px] bg-gray-500 rounded-xl text-white">
                #{postStates.markdownId[0]}
              </div>

              <Tile
                containerClass={`relative ${showTabTile ? "w-1/2" : "w-full"}`}
                title="Markdown"
                direction="left"
                type={false}
              >
                <TextareaAutosize
                  onResize={(e) => {}}
                  className="resize-none overflow-hidden
                                     bg-transparent w-full focus:outline-none"
                  onChange={(e) => postStates.markdownData[1](e.target.value)}
                  defaultValue={postStates.markdownData[0]}
                  ref={postMarkdownAreaRef}
                />
              </Tile>

              <div className="w-1/2 relative" hidden={!showTabTile}>
                <TabTile
                  tabs={[
                    {
                      key: 111,
                      name: "Preview",
                      element: (
                        <MarkdownPanel
                          currentMarkdown={postStates.markdownData[0]}
                          resourceMap={resourceMap}
                        />
                      ),
                    },
                    {
                      key: 112,
                      name: "Resources",
                      element: (
                        <ResourcePanel
                          setMarkdown={(newMarkdown: string) => {
                            postStates.markdownData[1](newMarkdown);
                            postMarkdownAreaRef.current!.value = newMarkdown;
                          }}
                          covers={postStates.covers[0]}
                          setCovers={postStates.covers[1]}
                          postId={currentPostId}
                          resources={currentResources.map((resource) => ({
                            id: resource.id,
                            title: resource.title,
                            filename: resource.filename,
                            type: resource.type,
                            description: resource.description || "",
                            url: resource.url,
                          }))}
                          setResources={(resources) =>
                            setCurrentResources(
                              resources.map((resource) => ({
                                postId: postId,
                                id: resource.id,
                                title: resource.title,
                                filename: resource.filename,
                                type: resource.type,
                                description: resource.description || "",
                                url: resource.url,
                              })),
                            )
                          }
                        />
                      ),
                    },
                  ]}
                  shown={showTabTile}
                  setShown={setShowTabTile}
                />
              </div>
            </div>
          </div>
        </MainLayout>
      </>
    </Restricted>
  );
}

export default EditorArea;
