import { NextRequest, NextResponse } from "next/server";
import { getAboutData } from "./worker";

export function GET(req: NextRequest) {
    return NextResponse.json(getAboutData());
}
