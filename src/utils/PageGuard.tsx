import { getSession } from "next-auth/react";

import type { Redirect } from "next";
import type {
  AuthGetServerSideProps,
  AuthServerSidePropsContext,
} from "@/types/PageGuard";
import { routes } from "@/constants/routes";

export enum RedirectTo {
  None,
  Home,
  Login,
}

export const withAuth =
  <T extends { [key: string]: any }>(
    getServerSidePropsfunc?: AuthGetServerSideProps<T>,
    {
      whenUnauthedRedirect = RedirectTo.None,
      whenAuthedRedirect = RedirectTo.None,
    } = {}
  ) =>
  async (context: AuthServerSidePropsContext) => {
    const { req } = context;
    const session = await getSession({ req });

    if (session?.user) {
      if (whenAuthedRedirect === RedirectTo.Home) {
        const redirect: Redirect = {
          destination: "/",
          permanent: false,
        };
        return { redirect };
      }
      context.session = session;
    } else if (whenUnauthedRedirect === RedirectTo.Login) {
      const redirect: Redirect = {
        destination: routes.signIn,
        permanent: false,
      };
      return { redirect };
    }
    if (getServerSidePropsfunc)
      return { ...(await getServerSidePropsfunc(context)) };

    /// @ts-ignore
    const defaultProps: T = {};
    return { props: defaultProps };
  };
