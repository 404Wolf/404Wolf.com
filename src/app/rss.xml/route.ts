import { type NextRequest, NextResponse } from "next/server";
// import { createRSSFeed } from "./worker";

export async function GET(_req: NextRequest) {
  return NextResponse.json({ error: "Not found" }, { status: 404 }); // for now
  // return new NextResponse(await createRSSFeed(), {
  //   headers: { "Content-Type": "application/rss+xml" },
  // });
}
