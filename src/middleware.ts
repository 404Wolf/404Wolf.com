import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { personalAuthRequest as auth } from "./app/auth/personalAuth";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const nextResponse = NextResponse.next();

  const applyHeaders = (response: NextResponse) => {
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set(
      "Access-Control-Allow-Methods",
      "GET, PUT, POST, DELETE, OPTIONS"
    );
    response.headers.set("Access-Control-Allow-Headers", "*");
    response.headers.set("Access-Control-Expose-Headers", "*");
    response.headers.set("Access-Control-Allow-Credentials", "true");
    response.headers.set("Access-Control-Max-Age", "86400");
  };
  applyHeaders(nextResponse);

  if (request.method === "OPTIONS") {
    const response = new NextResponse(null, { status: 204 });
    applyHeaders(response);
    return response;
  }

  if (request.url.includes("api/auth")) return NextResponse.next();

  if (await getToken({ req: request })) {
    return nextResponse;
  }

  if (request.method !== "GET") {
    if (auth(request)) {
      return nextResponse;
    }

    return new NextResponse(
      JSON.stringify({ error: "Missing or invalid API access token." }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  } else return nextResponse;
}

export const config = {
  matcher: "/api/:path*"
};
