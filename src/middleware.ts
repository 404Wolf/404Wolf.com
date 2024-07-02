import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { personalAuthRequest as auth } from "./app/auth/personalAuth";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  if (request.url.includes("api/auth")) return NextResponse.next();

  if (await getToken({ req: request })) {
    return NextResponse.next();
  }

  if (request.method !== "GET") {
    if (auth(request)) {
      return NextResponse.next();
    }
    return NextResponse.json(
      { error: "Missing or invalid API access token." },
      { status: 400 }
    );
  }
}

export const config = {
  matcher: "/api/:path*"
};
