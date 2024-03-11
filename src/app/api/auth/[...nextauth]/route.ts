import { PrismaClient } from "@prisma/client";
import NextAuth, { AuthOptions } from "next-auth";
import authOptions from "@/app/auth/authOptions";

const prisma = new PrismaClient()


const handler = NextAuth(authOptions as any as AuthOptions);
export { handler as GET, handler as POST };
