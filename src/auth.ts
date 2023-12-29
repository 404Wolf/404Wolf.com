import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next"
import type { NextAuthOptions } from "next-auth"
import { getServerSession } from "next-auth/next"
import {authOptions} from "@/pages/api/auth/[...nextauth]";


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
    if (!(await getServerSession(req, res, authOptions as NextAuthOptions))) {
        unauthorized(res);
        return false
    } else return true
}