import Restricted from "@/layouts/Restricted";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import StatusLayout from "@/layouts/StatusLayout";

const NewPost = () => {
    const router = useRouter();
    const [ready, setReady] = useState(false);

    useEffect(() => {
        if (ready) return;

        const newPostId = uuidv4().slice(24);
        console.log(newPostId);
        const newPostBody = {
            title: newPostId,
            description: "",
            covers: [],
            type: "unset",
            date: new Date().getFullYear().toString(),
            tags: [],
            notes: "",
        };
        fetch("/api/posts/add", {
            method: "POST",
            headers: { id: newPostId },
            body: JSON.stringify(newPostBody),
        }).then((resp) => {
            console.log(resp);
            if (resp.ok) {
                setReady(true);
                router.push(`/posts/unsets/${newPostId}/editor`);
            }
        });
    }, []);

    if (!ready)
        return (
            <Restricted>
                <StatusLayout name="Loading">Creating post...</StatusLayout>
            </Restricted>
        );
};

export default NewPost;
