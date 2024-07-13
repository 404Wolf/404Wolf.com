mport s3 from "@/utils/aws";
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
  if (!resource) {
    return NextResponse.json(
      {
        Status: "Failure",
        Message: "Unable to locate resource",
      },
      {
        status: 404,
      },
    );
  }

  const encoding = resource.type === "markdown" ? "utf-8" : "base64";
  const data = await s3.getResource(resource.filename, encoding);

  return NextResponse.json({
    status: "Success",
    resource: { ...resource, data: data, encoding: encoding },
  });
}

export async function POST(
  req: NextRequest,
  { params: { resourceId } }: { params: { resourceId: string } },
) {
  const body = await req.json();
  if (!body)
    return NextResponse.json(
      {
        Status: "Failure",
        Message: "No body for new resource found in request",
      },
      {
        status: 400,
      },
    );

  // Check to see if a resource with the ID already exists
  const resource = await prisma.resource.findUnique({
    where: {
      id: resourceId,
    },
  });
  if (resource) {
    return NextResponse.json(
      {
        Status: "Failure",
        Message: "Resource with that ID already exists",
      },
      {
        status: 409,
      },
    );
  }

  await prisma.resource.create({
    data: {
      id: resourceId,
      title: body.title,
      filename: body.filename,
      url: s3.resourceUrl(body.filename),
      type: body.type,
      description: body.description,
      post: {
        connect: { id: body.postId },
      },
    },
  });

  return NextResponse.json({
    status: "Success",
    message: `Resource successfully added to database. 
            Upload the image using the presigned upload URL attached to this body.`,
    uploadUrl: await s3.uploadFileLink(body.filename),
  });
}

export async function DELETE(
  req: NextRequest,
  { params: { resourceId } }: { params: { resourceId: string } },
) {
  const resource = await prisma.resource.findUnique({
    where: {
      id: resourceId,
    },
  });

  if (!resource) {
    return NextResponse.json(
      {
        status: "Failure",
        message: "Resource not found in database",
      },
      {
        status: 404,
      },
    );
  }

  await prisma.resource.delete({
    where: {
      id: resourceId,
    },
  });

  try {
    await s3.removeResource(resource.filename);
  } catch {
    return NextResponse.json(
      {
        status: "Failure",
        message:
          "Resource was not in S3 bucket even though it was in database.",
      },
      {
        status: 404,
      },
    );
  }

  return NextResponse.json({
    status: "Success",
    message: "Resource successfully deleted from database",
  });
}

export async function PUT(
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
        status: "Error",
        message: "Unable to locate resource to update",
      },
      {
        status: 404,
      },
    );
  }

  const body = await req.json();

  await prisma.resource.update({
    where: {
      id: resourceId,
    },
    data: {
      id: body.id,
      title: body.title,
      filename: body.filename,
      url: body.filename ? s3.resourceUrl(body.filename) : undefined,
      type: body.type,
      description: body.description,
    },
  });

  return NextResponse.json({
    status: "Success",
    message: "Successfully updated resource.",
  });
}
