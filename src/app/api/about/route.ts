import { type NextRequest, NextResponse } from "next/server";
import { getAboutData } from "./worker";

export function GET(_req: NextRequest) {
	return NextResponse.json(getAboutData());
}
