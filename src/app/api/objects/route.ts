import s3 from "@/utils/aws";
import { NextRequest, NextResponse } from "next/server";
import { personalAuthRequest } from "../../auth/personalAuth";

export async function GET(req: NextRequest) {
  const encoding = req.headers.get("encoding") as string;
  const objectName = req.headers.get("object") as string;
  const resource = await s3.getResource(objectName, encoding || "utf-8");

  if (!resource) {
    return NextResponse.json(
      {
        status: "Error",
        message: "Resource not found.",
      },
      {
        status: 404,
      },
    );
  }
  return NextResponse.json(
    {
      status: "Success",
      data: resource,
    },
    {
      status: 200,
    },
  );
}

export async function POST(req: NextRequest) {
  const objectName = req.headers.get("object") as string;
  const { dataType, data } = (await req.json()) as {
    dataType: "b64" | "str";
    data: string;
  };

  if (!["b64", "str"].includes(dataType))
    return NextResponse.json(
      {
        status: "Error",
        message: "Invalid data type.",
      },
      {
        status: 400,
      },
    );

  if (!data)
    return NextResponse.json(
      {
        status: "Error",
        message: "No data provided.",
      },
      {
        status: 400,
      },
    );

  const success = await s3.addResource(
    objectName,
    data,
    dataType,
    "text/plain",
  );
  if (!success)
    return NextResponse.json(
      {
        status: "Error",
        message: "Failed to add resource.",
      },
      {
        status: 500,
      },
    );
  else
    return NextResponse.json(
      {
        status: "Success",
      },
      {
        status: 200,
      },
    );
}
