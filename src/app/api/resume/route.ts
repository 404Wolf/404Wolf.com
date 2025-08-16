import { type NextRequest, NextResponse } from "next/server";
import s3 from "@/utils/aws";

export async function POST(_request: NextRequest) {
  if (process.env.NEXT_PUBLIC_RESUME_OBJECT_NAME) {
    return NextResponse.json({
      link: await s3.uploadFileLink(
        process.env.NEXT_PUBLIC_RESUME_OBJECT_NAME!,
      ),
    });
  } else {
    return NextResponse.json({
      error:
        "The environment variable NEXT_PUBLIC_RESUME_OBJECT_NAME is not set.",
    });
  }
}
