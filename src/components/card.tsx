import { useSpring, animated, to as interpolate } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import { useState } from "react";

// These two are just helpers, they curate spring data, values that are later being interpolated into css
const to = () => ({
  x: 0,
  y: 0,
  scale: 1,
  rot: -10 + Math.random() * 20,
  opacity: 1,
  delay: 0,
});
const from = () => ({ x: 0, rot: 0, scale: 1.5, y: 0, opacity: 0 });

// This is being used down there in the view, it interpolates rotation and scale into a css transform
const trans = (r: number, s: number) =>
  `rotateX(30deg) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`;

interface ICardProps {
  onDiscard?: () => void;
  type: string;
  text: string;
}

const normalize = (dx: number, dy: number, dirX: number, dirY: number) => {
  // avoid zero-division
  if (dx === 0 && dy === 0) return [dx, dy];

  const x = Math.abs(dx);
  const y = Math.abs(dy);

  // divide by the biggest factor
  if (x > y) return [dirX, (y / x) * dirY];
  return [(x / y) * dirX, dirY];
};

const Card = ({ type, text, onDiscard: discardHandler }: ICardProps) => {
  // The set flags all the cards that are flicked out
  const [discarded, setDiscarded] = useState(false);
  let _discarded = discarded;

  // Create a bunch of springs using the helpers above
  const [props, api] = useSpring(() => ({
    ...to(),
    from: from(),
  }));

  // Create a gesture, we're interested in down-state, delta (current-pos - click-pos), direction and velocity
  const bind = useDrag(
    ({ down, movement: [mx, my], direction: [dirX, dirY], velocity }) => {
      // If you flick hard enough it should trigger the card to fly out
      const trigger = velocity[0] > 0.2;

      // If button/finger's up and trigger velocity is reached, we flag the card ready to fly out
      if (!down && trigger) _discarded = true;

      api.start(() => {
        // When a card is gone it flys out left or right, otherwise goes back to zero
        const [dx, dy] = normalize(mx, my, dirX, dirY);
        const x = _discarded ? window.innerWidth * dx : down ? mx : 0;
        const y = _discarded ? window.innerHeight * dy : down ? my : 0;

        // How much the card tilts, flicking it harder makes it rotate faster
        const rot = mx / 100 + (_discarded ? dirX * 40 * velocity[0] : 0);

        // Active cards lift up a bit
        const scale = down ? 1.03 : 1;

        return {
          x,
          y,
          rot,
          scale,
          delay: undefined,
          config: {
            friction: 20,
            tension: down ? 800 : _discarded ? 200 : 500,
          },
        };
      });

      if (!down && _discarded) {
        setDiscarded(true);
        if (discardHandler) {
          discardHandler();
        } else
          setTimeout(() => {
            _discarded = false;
            api.start(() => to());
          }, 600);
      }
    }
  );

  return (
    <>
      <animated.div
        {...bind()}
        className='
          absolute w-[50vh] max-w-[85vw]
          aspect-[5/8]

          will-change-transform
          flex items-center justify-center
          touch-none

          bg-[url("/images/linnen.svg")] bg-cover
          rounded-3xl
          shadow-2xl shadow-black
        '
        key={0}
        style={{
          x: props.x,
          y: props.y,
          // transform: interpolate([props.rot, props.scale], trans),
          opacity: interpolate([props.opacity], (opacity) => opacity),
        }}
      >
        <div
          className='
         w-full h-full
           flex items-center justify-around flex-col
           '
        >
          <div className='w-3/4 select-none'>
            <img src={`/images/types/${type}.svg`} alt={type} />
          </div>
          <div className='text-[2vh] text-center w-4/5 h-1/2 select-none'>
            <p>{text}</p>
          </div>
        </div>
      </animated.div>
    </>
  );
};

export default Card;
