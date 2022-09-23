import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import type { AppPropsWithLayout } from "@/types/app";

const MyApp = ({
  Component,
  pageProps: sessionProviderProps,
}: AppPropsWithLayout<{ session: Session }>) => {
  const getLayout = Component.getLayout ?? ((page) => page);
  const { session, ...pageProps } = sessionProviderProps;

  return (
    <SessionProvider session={session}>
      {getLayout(<Component {...pageProps} />)}
    </SessionProvider>
  );
};

export default MyApp;
