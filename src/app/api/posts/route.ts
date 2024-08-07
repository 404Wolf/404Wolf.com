import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const posts = (await prisma.post.findMany({ select: { id: true } })).map(
    (post: any) => post.id
  );
  return NextResponse.json(posts);
}
