import Deck from "@/components/deck";

const App = () => {
  return (
    <div
      className='
        absolute w-full h-full
        overflow-hidden
        flex items-center justify-center
        bg-[#F98F8F] bg-[url("/images/bg.svg")] bg-80 bg-blend-multiply
      '
    >
      <Deck />
    </div>
  );
};

export default App;
