import {PrismaClient} from "@prisma/client";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const prisma = new PrismaClient()

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async signIn({user}) {
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

export default NextAuth(authOptions)
