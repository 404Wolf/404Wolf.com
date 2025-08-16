import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(_req: NextRequest) {
	return NextResponse.json({
		basicAbout: process.env.NEXT_PUBLIC_BASIC_ABOUT_OBJECT_NAME!,
		extendedAbout: process.env.NEXT_PUBLIC_EXTENDED_ABOUT_OBJECT_NAME!,
		resume: process.env.NEXT_PUBLIC_RESUME_OBJECT_NAME!,
	});
}
