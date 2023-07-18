import Restricted from "@/layouts/Restricted";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import StatusLayout from "@/layouts/StatusLayout";
import { GetServerSidePropsContext } from "next";

export async function getServerSideProps({ params }: GetServerSidePropsContext) {
    console.log(params);
    if (!params || !params.postId || !params.type)
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };

    return {
        props: {
            newPostId: params.postId,
            newPostType: params.type,
        },
    };
}

interface NewPostProps {
    newPostId: string;
    newPostType: string;
}

const NewPost = ({ newPostId, newPostType }: NewPostProps) => {
    const router = useRouter();
    const [ready, setReady] = useState(false);
    const date = new Date().getFullYear().toString()

    useEffect(() => {
        if (ready) return;

        const newPostBody = {
            title: newPostId,
            description: "",
            covers: [],
            type: newPostType,
            date: date,
            tags: ["hidden"],
            notes: "",
        };
        fetch("/api/posts/add", {
            method: "POST",
            headers: { id: newPostId },
            body: JSON.stringify(newPostBody),
        }).then((resp) => {
            if (resp.ok) {
                setReady(true);
                router.push(`/posts/${newPostType}/${newPostId}/editor`);
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
