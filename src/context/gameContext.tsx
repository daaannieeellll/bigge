import { SpringValue, useSpring } from "@react-spring/web";
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  replaceAmountPlaceholders,
  replacePlayerPlaceholders,
} from "@/utils/cardData";
import { callApi } from "@/utils/firestore/client";
import { Set } from "@/types/firestore/data";
import type { ICardData } from "@/components/cardData";
import type { ReactNode } from "react";

export interface IGameContext {
  running: boolean;
  startGame: () => void;
  stopGame: () => void;
  cardSet: Set;
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
  const startGame = useCallback(() => setRunning(true), []);
  const stopGame = useCallback(() => setRunning(false), []);

  const [cardSet, setCardSet] = useState<Set>({
    types: [""],
    probabilities: [0],
    colors: [""],
    cards: [[""]],
  } as Set);

  useEffect(() => {
    callApi("GET", "sets", "bigge", undefined, { includeCards: "yes" })
      .then((response) => response.json() as Promise<Set>)
      .then((set) => {
        setCardSet(set);
      });
  }, []);

  // get/set background color
  const [springProps, springApi] = useSpring(() => ({ color: "#F98F8F" }));
  const setBackgroundColor = useCallback(
    (color: string) => springApi.start(() => ({ color })),
    [springApi]
  );

  // get/set players
  const [players, setPlayers] = useState<string[]>([]);
  const updatePlayers = useCallback((newPlayers: string[]) => {
    setPlayers(newPlayers);
  }, []);

  // card probabilities
  const getPlayerName = useCallback(
    () => players[(Math.random() * players.length) | 0],
    [players]
  );
  const getCardType = useCallback(() => {
    let r = Math.random();
    let type = 0;
    for (; type < cardSet.types.length; ++type) {
      if (r < cardSet.probabilities[type]) break;
      else r -= cardSet.probabilities[type];
    }
    return type;
  }, [cardSet]);
  const getCardText = useCallback(
    (type: number) => {
      let id = (Math.random() * cardSet.cards[type].length) | 0;
      if (cardSet.cards[type].length > 1)
        id = (Math.random() * cardSet.cards[type].length) | 0;
      return cardSet.cards[type][id];
    },
    [cardSet]
  );
  const replacePlaceholders = useCallback(
    (cardData: ICardData) => {
      cardData.text = replaceAmountPlaceholders(cardData.text, [2, 5]);
      cardData.text = replacePlayerPlaceholders(cardData, getPlayerName);
      return cardData;
    },
    [getPlayerName]
  );
  const getCard = useCallback((): ICardData => {
    const id = getCardType();
    const type = cardSet.types[id];
    const text = getCardText(id);
    return replacePlaceholders({ id, type, text });
  }, [cardSet, getCardType, getCardText, replacePlaceholders]);

  const memoizedValue = useMemo(
    () => ({
      running,
      startGame,
      stopGame,
      cardSet,
      backgroundColor: springProps.color,
      setBackgroundColor,
      players,
      updatePlayers,
      getCard,
    }),
    [
      running,
      startGame,
      stopGame,
      cardSet,
      springProps.color,
      setBackgroundColor,
      players,
      updatePlayers,
      getCard,
    ]
  );
  return (
    <GameContext.Provider value={memoizedValue}>
      {children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;
