import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, { params: { resourceId } }: { params: { resourceId: string } }) {
    if (req.method === "GET") {
        if ((await prisma.resource.findUnique({ where: { id: resourceId } })) !== null)
            return NextResponse.json({
                exists: true
            })
        else {
            return NextResponse.json({
                exists: false
            })
        }
    }
}