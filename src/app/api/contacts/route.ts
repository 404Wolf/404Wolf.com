import { PrismaClient } from "@prisma/client";
import { type NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(_req: NextRequest) {
  return NextResponse.json(await prisma.contact.findMany());
}
