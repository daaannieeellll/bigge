import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import GameContextProvider from "@/context/gameContext";

import type { AppProps } from "next/app";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <SessionProvider session={pageProps.session}>
    <GameContextProvider>
      <Component {...pageProps} />
    </GameContextProvider>
  </SessionProvider>
);

export default MyApp;
