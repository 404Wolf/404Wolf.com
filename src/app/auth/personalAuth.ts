import { NextRequest } from "next/server";

export default function personalAuth(key: string) {
	return key === process.env.WOLF_SECRET;
}

export function personalAuthRequest(request: NextRequest) {
	const secret = request.headers.get("secret");
	if (secret === null) return false;
	return personalAuth(secret);
}
