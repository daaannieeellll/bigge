import { cookieNames } from "@/constants/cookies";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export const userAuthenticated = async (req: NextRequest) =>
  !!(await getToken({
    req,
    secret: process.env.JWT_SECRET,
    cookieName: cookieNames.sessionToken,
  }));
