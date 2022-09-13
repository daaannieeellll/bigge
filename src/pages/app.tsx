import { animated, useSpring } from "@react-spring/web";
import Deck from "@/components/deck";

import type { TypeInfo } from "@/types/card";

const App = () => {
  // change background when a new card enters the top of the deck
  const [props, api] = useSpring(() => ({ color: "#F98F8F" }));
  const changeBackground = ({ color }: TypeInfo) => {
    api.start(() => ({ color }));
  };

  return (
    <animated.div
      style={{ backgroundColor: props.color }}
      className='
        absolute w-full h-full
        overflow-hidden
        flex items-center justify-center
        bg-[url("/images/bg.svg")] bg-80 bg-blend-multiply
        '
    >
      <Deck onNewType={changeBackground} />
    </animated.div>
  );
};

export default App;
