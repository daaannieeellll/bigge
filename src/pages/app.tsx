import Deck from "@/components/deck";

const App = () => {
  return (
    <div
      className='
        bg-[#F98F8F] bg-[url("/images/bg.svg")] bg-80 bg-blend-multiply
        flex items-center justify-center
        h-[100vh]
      '
    >
      <Deck />
    </div>
  );
};

export default App;
