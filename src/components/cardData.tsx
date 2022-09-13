export interface ICardDataProps {
  id?: number;
  type: string;
  text: string;
}

const CardData = ({ type, text }: ICardDataProps) => {
  return (
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
  );
};

export default CardData;
