import { PrismaClient } from "@prisma/client";
import { type NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(_request: NextRequest) {
	const posts = (await prisma.post.findMany({ select: { id: true } })).map(
		(post: any) => post.id,
	);
	return NextResponse.json(posts);
}
