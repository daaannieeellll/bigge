interface Props {
  active: boolean;
  className?: string;
  onClick: () => void;
}
const Hamburger = ({ active, onClick, className }: Props) => {
  return (
    <button className={`z-50 ${className || ""}`} onClick={onClick}>
      <div
        className={`
          relative flex h-[50px] w-[50px]
            items-center justify-center overflow-hidden
          rounded-full bg-slate-700 shadow-md
          ring-gray-300 ring-opacity-30 hover:ring-8
          transform transition-all duration-200
          ${active ? "ring-4" : "ring-0"}
        `}
      >
        <div
          className='
            h-[20px] w-[20px]
            flex flex-col justify-between
            origin-center overflow-hidden
            transform transition-all duration-300
          '
        >
          <div
            className={`
              h-[2px] w-7
              origin-left
              bg-white
              transform transition-all delay-100 duration-300
              ${active && "translate-y-6"}
            `}
          ></div>
          <div
            className={`
              h-[2px] w-7
              rounded
              bg-white
              transform transition-all delay-75 duration-300
              ${active && "translate-y-6"}
            `}
          ></div>
          <div
            className={`
              h-[2px] w-7
              origin-left
              bg-white
              transform  transition-all duration-300
              ${active && "translate-y-6"}
            `}
          ></div>
          <div
            className={`
              absolute top-2.5
              flex items-center justify-between
              transform  transition-all duration-500
              ${active ? "w-12" : "w-0"}
              ${active ? "translate-x-0" : "-translate-x-10"}
            `}
          >
            <div
              className={`
                absolute h-[2px] w-5
                bg-white
                transform transition-all delay-300 duration-500
                ${active ? "rotate-45" : "rotate-0"}
              `}
            ></div>
            <div
              className={`
                absolute h-[2px] w-5
                bg-white
                transform transition-all delay-300 duration-500
                ${active ? "-rotate-45" : "-rotate-0"}
              `}
            ></div>
          </div>
        </div>
      </div>
    </button>
  );
};
export default Hamburger;
