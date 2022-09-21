import GameDeck from "@/components/gameDeck";
import GameConfigDeck from "@/components/gameConfigDeck";
import { GameContext } from "@/context/gameContext";
import { useContext } from "react";
import GameLayout from "@/components/gameLayout";

import type { ReactElement } from "react";
import type { NextPageWithLayout } from "@/types/app";

const Play: NextPageWithLayout = () => {
  const { running, setBackgroundColor } = useContext(GameContext);

  return running ? (
    <GameDeck
      onNewTopCard={(type) => setBackgroundColor(type.color ?? "#F98F8F")}
    />
  ) : (
    <GameConfigDeck />
  );
};
Play.getLayout = (page: ReactElement) => <GameLayout>{page}</GameLayout>;

export default Play;
