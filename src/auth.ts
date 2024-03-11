import type { NextApiRequest, NextApiResponse } from "next";
import type { AuthOptions, NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth/next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const authOptions = {
    providers: [
        ({
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
} as unknown as AuthOptions;
export default authOptions;

/**
 * Updates the response to indicate that the user is not authenticated.
 *
 * @param res The response object.
 */
export const unauthorized = (res: NextApiResponse) => {
    res.status(401).json({
        status: "Error",
        message: "You must be authenticated to perform this action.",
    });
}

/**
 * Authenticates the user and updates the response to indicate that the user is not authenticated.
 *
 * @param req The request object.
 * @param res The response object.
 * @returns Whether the user is authenticated.
 */
export const auth = async (req: NextApiRequest, res: NextApiResponse) => {
    if (!(await getServerSession(req, res, authOptions))) {
        unauthorized(res);
        return false
    } else return true
}
