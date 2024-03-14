"use server";

import s3 from "@/utils/aws";
import { redirect } from "next/navigation";

export async function redirectToResume() {
    const resumePath = s3.resourceUrl(process.env.NEXT_PUBLIC_RESUME_OBJECT_NAME!);
    redirect(resumePath);
}