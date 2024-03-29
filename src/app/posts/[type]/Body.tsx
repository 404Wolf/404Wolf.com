"use client";

import Tile from "@/components/misc/Tiles/Tile";
import ExtendedPostCard, { PostData } from "@/components/posts/ExtendedPostCard";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default  function Body({
    posts,
    type,
    typeDescription,
}: {
    posts: PostData[];
    type: string;
    typeDescription: string;
}) {
    const session = useSession();
    const [newPostId, setNewPostId] = useState("New post ID");

    const hiddenPosts = posts.filter((post) => post.tags.includes("hidden"));
    const visiblePosts = posts.filter((post) => !post.tags.includes("hidden"));

    posts = visiblePosts.concat(hiddenPosts);

    return (
        <Tile>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-7 md:gap-y-10 p-1 pt-2">
                {session.status === "authenticated" && (
                    <ExtendedPostCard
                        editableId={true}
                        setNewPostId={(newId) => setNewPostId(newId)}
                        path={`/posts/${type.slice(0, -1)}/${newPostId}/new`}
                        title={`Create a new ${type.slice(0, -1)} post!`}
                        description={`Click "Create a new ${type.slice(
                            0,
                            -1
                        )} post!" to set an ID for a new post. Then click in the main area of this box to automatically create the post and open up the post editor. New posts are hidden and featured by default, but you can remove the "hidden" tag and click the refresh button to publish.`}
                        date={new Date().getFullYear().toString()}
                        tags={["hidden", "featured"]}
                        key={999999}
                    />
                )}
                {posts &&
                    posts
                        .filter(
                            (post) =>
                                session.status === "authenticated" ||
                                !post.tags.includes("hidden")
                        )
                        .map((post, key) => (
                            <ExtendedPostCard
                                coverUrl={post.coverUrl || null}
                                coverAlt={post.coverAlt || null}
                                path={`/posts/${type.slice(0, -1)}/${post.id}`}
                                title={post.title}
                                description={post.description}
                                date={post.date}
                                tags={post.tags}
                                key={key}
                            />
                        ))}
            </div>
        </Tile>
    );
}
