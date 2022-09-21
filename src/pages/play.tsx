import GameDeck from "@/components/gameDeck";
import GameConfigDeck from "@/components/gameConfigDeck";
import { GameContext } from "@/context/gameContext";
import { animated } from "@react-spring/web";
import { useContext } from "react";

const Play = () => {
  const { running, backgroundColor, setBackgroundColor } =
    useContext(GameContext);

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
      {running ? (
        <GameDeck
          onNewTopCard={(type) => setBackgroundColor(type.color ?? "#F98F8F")}
        />
      ) : (
        <GameConfigDeck />
      )}
    </animated.div>
  );
};

export default Play;
