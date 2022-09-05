import { cookieNames } from "@/constants/cookies";
import { routes } from "@/constants/routes";
import type { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import type { NextAuthOptions } from "next-auth";

import NextAuth from "next-auth";

import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
    }),
  ],
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  cookies: {
    sessionToken: {
      name: cookieNames.sessionToken,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: true,
      },
    },
    callbackUrl: {
      name: cookieNames.callbackUrl,
      options: {
        sameSite: "lax",
        path: "/",
        secure: true,
      },
    },
    csrfToken: {
      name: cookieNames.csrfToken,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: true,
      },
    },
    pkceCodeVerifier: {
      name: cookieNames.pkceCodeVerifier,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: true,
      },
    },
    state: {
      name: cookieNames.state,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: true,
      },
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: { signIn: routes.signIn, signOut: routes.signOut },
  // debug: true,
};

const nextAuthHandler: NextApiHandler = (
  req: NextApiRequest,
  res: NextApiResponse
) => NextAuth(req, res, authOptions);
export default nextAuthHandler;
