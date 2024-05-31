import s3 from "@/utils/aws";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params: { resourceId } }: { params: { resourceId: string } },
) {
  const resource = await prisma.resource.findUnique({
    where: {
      id: resourceId,
    },
  });
  if (resource === null) {
    return NextResponse.json(
      {
        status: "Failure",
        message: "Resource not found in database",
      },
      {
        status: 404,
      },
    );
  } else {
    return NextResponse.json({
      status: "Success",
      url: await s3.getResourceDownloadLink(resource.filename),
    });
  }
}
