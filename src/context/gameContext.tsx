import {
  replaceAmountPlaceholders,
  replacePlayerPlaceholders,
} from "@/utils/cardData";
import { SpringValue, useSpring } from "@react-spring/web";
import { createContext, ReactNode, useState } from "react";
import { data } from "/data";

import type { ICardData } from "@/components/cardData";

type PList = {
  self: number;
  player: number[];
}[];

export interface IGameContext {
  running: boolean;
  startGame: () => void;
  stopGame: () => void;
  backgroundColor: SpringValue<string>;
  setBackgroundColor: (color: string) => void;
  players: string[];
  updatePlayers: (players: string[]) => void;
  getCard: () => ICardData;
}

export const GameContext = createContext<IGameContext>({} as IGameContext);

const GameContextProvider = ({ children }: { children: ReactNode }) => {
  // get/set game state
  const [running, setRunning] = useState(false);
  const startGame = () => setRunning(true);
  const stopGame = () => setRunning(false);

  // get/set background color
  const [props, api] = useSpring(() => ({ color: "#F98F8F" }));
  const setBackgroundColor = (color: string) => {
    api.start(() => ({ color }));
  };

  // get/set players
  const [players, setPlayers] = useState<string[]>([]);
  const updatePlayers = (newPlayers: string[]) => {
    setPlayers(newPlayers);
    setProbabilities(
      [...Array(data.meta.types.length)].map((_, i) => ({
        self: data.meta.probabilities[i],
        player: Array(newPlayers.length).fill(1 / newPlayers.length),
      }))
    );
  };

  // card probabilities
  const [probabilities, setProbabilities] = useState<PList>([]);
  const [playedCards, setPlayedCards] = useState<number[][]>(
    Array(data.meta.types.length).fill([])
  );
  const getPlayerName = (type: number) => {
    let r = Math.random();
    let i = 0;
    for (; i < players.length; ++i) {
      if (r < probabilities[type].player[i]) break;
      else r -= probabilities[type].player[i];
    }
    return players[i];
  };
  const getCardType = () => {
    let r = Math.random();
    let type = 0;
    for (; type < data.meta.types.length; ++type) {
      if (r < probabilities[type].self) break;
      else r -= probabilities[type].self;
    }
    return type;
  };
  const getCardText = (type: number) => {
    let id = (Math.random() * data.cards[type].length) | 0;
    if (data.cards[type].length > 1)
      while (playedCards[type].includes(id))
        id = (Math.random() * data.cards[type].length) | 0;
    return data.cards[type][id];
  };
  const replacePlaceholders = (cardData: ICardData) => {
    cardData.text = replaceAmountPlaceholders(cardData.text, data.meta.amounts);
    cardData.text = replacePlayerPlaceholders(cardData, getPlayerName);
    return cardData;
  };
  const getCard = (): ICardData => {
    const id = getCardType();
    const type = data.meta.types[id];
    const text = getCardText(id);
    return replacePlaceholders({ id, type, text });
  };

  return (
    <GameContext.Provider
      value={{
        running,
        startGame,
        stopGame,
        backgroundColor: props.color,
        setBackgroundColor,
        players,
        updatePlayers,
        getCard,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;
