import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppPropsWithLayout } from "@/types/app";

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <SessionProvider session={pageProps.session}>
      {getLayout(<Component {...pageProps} />)}
    </SessionProvider>
  );
};

export default MyApp;
