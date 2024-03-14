import { PrismaClient } from "@prisma/client";
import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const prisma = new PrismaClient()

/**
 * The authentication options for next auth.
 */
export const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        async signIn({ user }: { user: { id: string } }) {
            if ((await prisma.user.findUnique({
                where: {
                    id: user.id
                }
            })) === null)
                return "https://www.youtube.com/watch?v=p7YXXieghto"
            else return true
        }
    }
};


const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
