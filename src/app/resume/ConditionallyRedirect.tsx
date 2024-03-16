"use client";

import EditablePdfDisplay from "@/components/displays/EditablePdfDisplay";
import s3 from "@/utils/aws";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ConditionallyRedirect() {
    const resumeUrl = s3.resourceUrl(process.env.NEXT_PUBLIC_RESUME_OBJECT_NAME!);

    const { push } = useRouter();
    const session = useSession({
        required: true,
        onUnauthenticated() {
            push(resumeUrl);
        },
    });
    
    return <EditablePdfDisplay pdfPath={resumeUrl} />;
}