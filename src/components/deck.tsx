import { useEffect, useState } from "react";

import CardContainer from "@/components/cardContainer";
import CardData from "@/components/cardData";
import { data } from "/data";

import type { ICardDataProps } from "@/components/cardData";

const Deck = () => {
  // generate deck getter and setter
  const [deck, setDeck] = useState<ICardDataProps[]>([]);
  const [cardNo, setCardNo] = useState(0);

  let addCard = () => {
    // get data
    const idx = (Math.random() * data.meta.types.length) | 0;
    const type = data.meta.types[idx];
    const text = data.cards[idx][(Math.random() * data.cards[idx].length) | 0];

    // store/update data
    setDeck((deck) => {
      return deck.length < 3
        ? [{ type, text }, ...deck]
        : [{ type, text }, ...deck.slice(0, -1)];
    });
    setCardNo((cardNo) => cardNo + 1);
  };

  // Initialize deck
  useEffect(() => {
    const initialCards = [...Array(2)].map(() => {
      const idx = (Math.random() * data.meta.types.length) | 0;
      const type = data.meta.types[idx];
      return {
        type,
        text: data.cards[idx][(Math.random() * data.cards[idx].length) | 0],
      };
    });

    setDeck(initialCards);
    setCardNo(initialCards.length);
  }, []);

  return (
    <>
      {deck.map((card, idx) => (
        <CardContainer key={cardNo - idx} onDiscard={addCard}>
          <CardData type={card.type} text={card.text} />
        </CardContainer>
      ))}
    </>
  );
};

export default Deck;
