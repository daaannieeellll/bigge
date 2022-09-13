import { useEffect, useState } from "react";

import maxDeckSize from "@/constants/gameConfig";
import CardContainer from "@/components/cardContainer";
import CardData from "@/components/cardData";
import { data } from "/data";

import type { ICardDataProps } from "@/components/cardData";
import { TypeInfo } from "@/types/card";

interface IDeckProps {
  onNewType?: (arg: TypeInfo) => void;
}

const Deck = ({ onNewType: newTypeHandler }: IDeckProps) => {
  // generate deck getter and setter
  const [deck, setDeck] = useState<ICardDataProps[]>([]);
  const [cardNo, setCardNo] = useState(0);

  let addCard = () => {
    // get data
    const id = (Math.random() * data.meta.types.length) | 0;
    const type = data.meta.types[id];
    const text = data.cards[id][(Math.random() * data.cards[id].length) | 0];

    // store/update data
    setDeck((deck) => {
      return deck.length < maxDeckSize
        ? [{ id, type, text }, ...deck]
        : [{ id, type, text }, ...deck.slice(0, -1)];
    });
    setCardNo((cardNo) => cardNo + 1);
  };

  // Initialize deck
  useEffect(() => {
    const initialCards = [...Array(maxDeckSize - 1)].map(() => {
      const id = (Math.random() * data.meta.types.length) | 0;
      const type = data.meta.types[id];
      return {
        id,
        type,
        text: data.cards[id][(Math.random() * data.cards[id].length) | 0],
      };
    });

    setDeck(initialCards);
    setCardNo(initialCards.length);
  }, []);

  return (
    <>
      {deck.map((card, idx) => {
        // only call handler for top card
        if (idx === 1 && newTypeHandler)
          newTypeHandler({
            color: data.meta.colors[card.id || 0],
          });

        return (
          <CardContainer key={cardNo - idx} onDiscard={addCard}>
            <CardData type={card.type} text={card.text} />
          </CardContainer>
        );
      })}
    </>
  );
};

export default Deck;
