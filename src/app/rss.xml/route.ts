import { type NextRequest, NextResponse } from "next/server";
import { createRSSFeed } from "./worker";

export async function GET(_req: NextRequest) {
  return new NextResponse(await createRSSFeed(), {
    headers: { "Content-Type": "application/rss+xml" },
  });
}
