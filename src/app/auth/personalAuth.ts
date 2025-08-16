import type { NextRequest } from "next/server";

export function personalAuthRequest(request: NextRequest) {
  const secret = request.headers.get("secret");
  if (secret === null) return false;
  return secret === process.env.WOLF_SECRET;
}
