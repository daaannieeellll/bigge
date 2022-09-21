import GameContextProvider from "@/context/gameContext";
import GameBackground from "@/components/gameBackground";
import type { ReactNode } from "react";

const GameLayout = ({ children }: { children: ReactNode }) => (
  <GameContextProvider>
    <GameBackground>{children}</GameBackground>
  </GameContextProvider>
);

export default GameLayout;
