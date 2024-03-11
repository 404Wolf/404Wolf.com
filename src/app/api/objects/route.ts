import s3 from "@/utils/aws";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const encoding = req.headers.get("encoding") as string;
    const objectName = req.headers.get("object") as string;
    const resource = await s3.getResource(objectName, encoding || "utf-8");

    if (!resource) {
        return NextResponse.json({
            status: "Error",
            message: "Resource not found.",
        }, {
            status: 404,


        })
    } return NextResponse.json({
        status: "Success",
        data: resource,
    }, {
        status: 200,
    })
}
