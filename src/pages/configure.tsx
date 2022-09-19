import GameConfigDeck from "@/components/gameConfigDeck";

const Setup = () => {
  return (
    <div
      className='
        absolute w-full h-full
        overflow-hidden
        flex items-center justify-center
        bg-[#F98F8F] bg-[url("/images/bg.svg")] bg-80 bg-blend-multiply
        '
    >
      <GameConfigDeck />
    </div>
  );
};

export default Setup;
