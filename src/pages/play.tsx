import { animated, useSpring } from "@react-spring/web";
import GameDeck from "@/components/gameDeck";

import type { TypeInfo } from "@/types/card";

const Play = () => {
  // change background when a new card enters the top of the deck
  const [props, api] = useSpring(() => ({ color: "#F98F8F" }));
  const changeBackground = ({ color }: TypeInfo) => {
    api.start(() => ({ color }));
  };

  return (
    <animated.div
      style={{ backgroundColor: props.color }}
      className='
        absolute h-[100vh] w-[100vw]
        overflow-hidden
        flex items-center justify-center
        bg-[url("/images/bg.svg")] bg-80 bg-blend-multiply
        '
    >
      <GameDeck onNewTopCard={changeBackground} />
    </animated.div>
  );
};

export default Play;
