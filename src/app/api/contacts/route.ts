import { NextApiRequest } from "next";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export default async function GET(req: NextApiRequest) {
    return NextResponse.json(await prisma.contact.findMany());
}
