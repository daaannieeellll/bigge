import { ReactNode, useEffect, useRef, useState } from "react";
import { useSpring, animated, to as interpolate } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import { cardRatio, maxCardHeight, maxCardWidth } from "@/constants/cards";

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

const normalize = (dx: number, dy: number, dirX: number, dirY: number) => {
  // avoid zero-division
  if (dx === 0 && dy === 0) return [dx, dy];

  const x = Math.abs(dx);
  const y = Math.abs(dy);

  // divide by the biggest factor
  if (x > y) return [dirX, (y / x) * dirY];
  return [(x / y) * dirX, dirY];
};

interface ICardProps {
  children: ReactNode;
  onDiscard?: (...args: any) => boolean;
}
const CardContainer = ({ children, onDiscard: discardHandler }: ICardProps) => {
  // helper reference to get element positioning
  const ref = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(0);
  const [centerY, setCenterY] = useState(0);

  const setCardProperties = () => {
    setCenterY(
      ((ref?.current?.clientHeight || 0) + (ref?.current?.offsetTop || 0)) / 2
    );
    const parent = ref.current?.parentElement;
    if (parent)
      setCardWidth(
        maxCardWidth * parent.clientWidth >
          ((maxCardHeight * cardRatio.x) / cardRatio.y) * parent.clientHeight
          ? ((maxCardHeight * cardRatio.x) / cardRatio.y) * parent.clientHeight
          : maxCardWidth * parent.clientWidth
      );
  };

  // set vertical center on first render and update whenever the card resizes
  useEffect(() => setCardProperties(), []);
  useEffect(() => {
    const resizeObserver = new ResizeObserver(setCardProperties);
    if (ref.current?.parentElement)
      resizeObserver.observe(ref.current.parentElement);
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

        // When a card is gone it flies out, otherwise goes back to zero
        if (_discarded) {
          const [dx, dy] = normalize(mx, my, dirX, dirY);
          const x = window.innerWidth * dx * 2;
          const y = window.innerHeight * dy * 2;
          const rot = fromUpperHalf * dirX * 90;

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
        // discardHandler returns false if the card should not be discarded
        if (discardHandler && discardHandler()) {
          setDiscarded(true);
        } else {
          setTimeout(() => {
            _discarded = false;
            api.start(() => to());
          }, 200);
        }
      }
    }
  );

  return (
    <animated.div
      // use this reference to check if the card dimensions change
      ref={ref}
      // add gesture handlers
      {...bind()}
      className='
          absolute

          will-change-transform
          flex items-center justify-center
          touch-none

          bg-[url("/images/linnen.svg")] bg-cover
          rounded-3xl
          shadow-2xl shadow-black
        '
      style={{
        width: cardWidth,
        aspectRatio: `${cardRatio.x} / ${cardRatio.y}`,
        x: props.x,
        y: props.y,
        transform: interpolate([props.rot, props.scale], trans),
        opacity: interpolate([props.opacity], (opacity) => opacity),
      }}
    >
      {children}
    </animated.div>
  );
};

export default CardContainer;
