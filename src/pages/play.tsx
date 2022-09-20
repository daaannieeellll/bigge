import GameDeck from "@/components/gameDeck";
import { GameContext } from "@/context/gameContext";
import { animated } from "@react-spring/web";
import { useContext } from "react";

const Play = () => {
  const { backgroundColor, setBackgroundColor } = useContext(GameContext);

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
      <GameDeck
        onNewTopCard={(type) => setBackgroundColor(type.color ?? "#F98F8F")}
      />
    </animated.div>
  );
};

export default Play;
