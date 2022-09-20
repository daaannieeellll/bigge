import { SpringValue, useSpring } from "@react-spring/web";
import { createContext, ReactNode, useState } from "react";

export interface IGameContext {
  players: string[];
  updatePlayers: (players: string[]) => void;

  running: boolean;
  startGame: () => void;
  stopGame: () => void;

  backgroundColor: SpringValue<string>;
  setBackgroundColor: (color: string) => void;
}

export const GameContext = createContext<IGameContext>({
  players: [],
  updatePlayers: (players: string[]) => {},
  running: false,
  startGame: () => {},
  stopGame: () => {},
  backgroundColor: new SpringValue<string>(),
  setBackgroundColor: (color: string) => {},
});

const GameContextProvider = ({ children }: { children: ReactNode }) => {
  // players state
  const [players, setPlayers] = useState<string[]>([]);
  const updatePlayers = (newPlayers: string[]) => {
    setPlayers(newPlayers);
  };

  // game state
  const [running, setRunning] = useState(false);
  const startGame = () => setRunning(true);
  const stopGame = () => setRunning(false);

  // background color state and animation
  const [props, api] = useSpring(() => ({ color: "#F98F8F" }));
  const setBackgroundColor = (color: string) => {
    api.start(() => ({ color }));
  };

  return (
    <GameContext.Provider
      value={{
        players,
        updatePlayers,
        running,
        startGame,
        stopGame,
        backgroundColor: props.color,
        setBackgroundColor,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;
