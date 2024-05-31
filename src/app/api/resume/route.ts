import s3 from "@/utils/aws";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
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
