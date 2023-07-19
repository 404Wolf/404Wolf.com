import Restricted from "@/layouts/Restricted";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import StatusLayout from "@/layouts/StatusLayout";
import { GetServerSidePropsContext } from "next";

export async function getServerSideProps({ params }: GetServerSidePropsContext) {
    if (params && params.postId && params.type)
        return {
            props: {
                newPostId: params.postId,
                newPostType: params.type,
            },
        };
    else
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
}

interface NewPostProps {
    newPostId: string;
    newPostType: string;
}

const NewPost = ({ newPostId, newPostType }: NewPostProps) => {
    const router = useRouter();
    const date = new Date().getFullYear().toString();
    useEffect(() => {
        fetch(`/api/posts/${newPostId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: newPostId,
                description: "",
                covers: [],
                type: newPostType,
                date: date,
                tags: ["hidden"],
                notes: "",
            }),
        }).then((resp) => {
            if (resp.ok || resp.status === 403) {
                router.push(`/posts/${newPostType}/${newPostId}/editor`);
            } else {
                router.push("/");
            }
        });
    }, []);

    return (
        <Restricted>
            <StatusLayout name="Loading">Creating post...</StatusLayout>
        </Restricted>
    );
};

export default NewPost;
