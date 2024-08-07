import { type NextRequest, NextResponse } from "next/server";
import { createRSSFeed } from "./worker";

export async function GET(req: NextRequest) {
  return new NextResponse(await createRSSFeed())
}
