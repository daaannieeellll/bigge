import { GameContext } from "@/context/gameContext";
import { animated } from "@react-spring/web";
import { useContext } from "react";
import type { ReactNode } from "react";

const GameBackground = ({ children }: { children: ReactNode }) => {
  const { backgroundColor } = useContext(GameContext);
  return (
    <animated.div
      style={{ backgroundColor }}
      className='
        absolute w-full h-full
        overflow-hidden
        flex items-center justify-center
        bg-[url("/images/bg.svg")] bg-80 bg-blend-multiply
        '
    >
      {children}
    </animated.div>
  );
};

export default GameBackground;
