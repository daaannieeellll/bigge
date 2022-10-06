import Hamburger from "@/components/hamburger";
import { useState } from "react";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}
const Navigation = ({ children }: Props) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Hamburger
        className='fixed bottom-4 right-4 md:hidden'
        onClick={() => setVisible((s) => !s)}
        active={visible}
      />
      <div
        className={`
          fixed w-screen h-screen z-10
          flex flex-col items-center justify-center
          bg-white/70 dark:bg-neutral-900/70
          dark:text-white
          transition-all duration-700 ease-in-out
          ${visible ? "translate-x-0" : "translate-x-full"}
          ${visible ? "opacity-100" : "opacity-0"}
          ${visible ? "backdrop-blur-md" : "backdrop-blur-none"}

          md:translate-x-0 md:opacity-100 md:backdrop-blur-none
          md:relative md:w-auto md:h-auto md:z-0
          md:transition-none md:items-start
          md:p-5 md:min-w-[10rem]
        `}
      >
        <div
          className='
          h-1/2 flex flex-col items-center justify-around
          md:items-start
        '
        >
          {children}
        </div>
      </div>
    </>
  );
};
export default Navigation;
