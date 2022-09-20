import { createContext, ReactNode, useState } from "react";

export interface IGameContext {
  players: string[];
  updatePlayers: (players: string[]) => void;

  running: boolean;
  startGame: () => void;
  stopGame: () => void;
}

export const GameContext = createContext<IGameContext>({
  players: [],
  updatePlayers: (players: string[]) => {},
  running: false,
  startGame: () => {},
  stopGame: () => {},
});

const GameContextProvider = ({ children }: { children: ReactNode }) => {
  const [players, setPlayers] = useState<string[]>([]);
  const [running, setRunning] = useState(false);

  const updatePlayers = (newPlayers: string[]) => {
    setPlayers(newPlayers);
  };
  const startGame = () => setRunning(true);
  const stopGame = () => setRunning(false);

  return (
    <GameContext.Provider
      value={{ players, updatePlayers, running, startGame, stopGame }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;
