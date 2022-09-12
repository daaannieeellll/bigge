import { useSpring, animated, to as interpolate } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import { useEffect, useRef, useState } from "react";

// These two are just helpers, they curate spring data, values that are later being interpolated into css
const to = () => ({
  x: 0,
  y: 0,
  scale: 1,
  rot: -2.5 + Math.random() * 5,
  opacity: 1,
});
const from = () => ({ x: 0, rot: 0, scale: 0.7, y: 0, opacity: 0 });

// This is being used down there in the view, it interpolates rotation and scale into a css transform
const trans = (r: number, s: number) => `rotate(${r}deg) scale(${s})`;

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
  // helper reference to get element positioning
  const ref = useRef<HTMLDivElement>(null);
  const [centerY, setCenterY] = useState(0);
  const setCardCenter = () =>
    setCenterY(
      ((ref?.current?.clientHeight || 0) + (ref?.current?.offsetTop || 0)) / 2
    );
  // set vertical center on first render and update whenever the card resizes
  useEffect(() => setCardCenter(), []);
  useEffect(() => {
    const resizeObserver = new ResizeObserver(setCardCenter);
    if (ref.current) resizeObserver.observe(ref.current);
  }, []);

  // The set flags all the cards that are flicked out
  const [discarded, setDiscarded] = useState(false);
  let _discarded = discarded;

  // Create a bunch of springs using the helpers above
  const [props, api] = useSpring(() => ({
    ...to(),
    from: from(),
  }));

  // Create a drag gesture
  const bind = useDrag(
    ({
      down,
      initial: [, initY],
      offset: [offsetX],
      movement: [mx, my],
      direction: [dirX, dirY],
      velocity: [vx, vy],
    }) => {
      // set minimal velocity for card to discard
      const trigger = vx + vy > 0.6;

      // card is dragged from upper half
      const fromUpperHalf = centerY > initY ? 1 : -1;

      // If button/finger's up and trigger velocity is reached, we flag the card ready to discard
      if (!down && trigger) _discarded = true;

      api.start(() => {
        // Active cards lift up a bit
        const scale = down ? 1.03 : 1;

        // When a card is gone it flys out, otherwise goes back to zero
        if (_discarded) {
          const [dx, dy] = normalize(mx, my, dirX, dirY);
          const x = window.innerWidth * dx * 2;
          const y = window.innerHeight * dy * 2;
          const rot = fromUpperHalf * dirX * 90;
          console.log(rot);
          return {
            x,
            y,
            rot,
            scale,
            config: {
              friction: 40,
              tension: down ? 800 : 150,
            },
          };
        } else {
          const x = down ? mx : 0;
          const y = down ? my : 0;

          // How much the card tilts, flicking it harder makes it rotate faster
          const rot = (fromUpperHalf * dirX * vx * Math.abs(offsetX)) / 10;
          console.log(rot);

          return {
            x,
            y,
            rot,
            scale,
            config: {
              friction: 50,
              tension: down ? 600 : 500,
            },
          };
        }
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
        ref={ref}
        {...bind()}
        className='
          absolute w-full max-h-[80%] max-w-[85%]
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
          transform: interpolate([props.rot, props.scale], trans),
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
