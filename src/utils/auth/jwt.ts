import { cookieNames } from "@/constants/auth/cookies";
import { getToken } from "next-auth/jwt";
import type { NextApiRequest } from "next";
import type { NextRequest } from "next/server";

export const userAuthenticated = async (req: NextRequest | NextApiRequest) =>
  !!(await getToken({
    req,
    secret: process.env.JWT_SECRET,
    cookieName: cookieNames.sessionToken,
  }));
