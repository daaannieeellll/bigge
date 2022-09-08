import type { CardType } from "@/constants/cardTypes";
import { useEffect, useState } from "react";

import Card from "@/components/card";
import { data } from "/data";

const types: CardType[] = [
  "Big",
  "Baas",
  "Lepeltje Lepeltje",
  "Medusa",
  "Most Likely To",
  "Never Have I Ever",
  "Opdracht",
  "Stemrecht",
  "Vingeren",
];

const Deck = () => {
  // generate deck getter and setter
  const [deck, setDeck] = useState<{ type: string; text: string }[]>([]);
  const [cardNo, setCardNo] = useState(0);

  let addCard = () => {
    // get data
    const type = types[Math.floor(Math.random() * types.length)];
    const text = data[type][Math.floor(Math.random() * data[type].length)];

    // store/update data
    setDeck((deck) => [{ type, text }, ...deck.slice(0, -1)]);
    setCardNo((cardNo) => cardNo + 1);

    console.log(deck);
  };

  // Initialize deck
  useEffect(() => {
    setDeck([
      {
        type: "Opdracht",
        text: data.Opdracht[Math.floor(Math.random() * data.Opdracht.length)],
      },
      {
        type: "Opdracht",
        text: data.Opdracht[Math.floor(Math.random() * data.Opdracht.length)],
      },
      {
        type: "Opdracht",
        text: data.Opdracht[Math.floor(Math.random() * data.Opdracht.length)],
      },
    ]);
    setCardNo(3);
  }, []);

  return (
    <>
      {deck.map((card, idx) => (
        <Card
          key={cardNo - idx}
          type={card.type}
          text={card.text}
          onDiscard={addCard}
        />
      ))}
    </>
  );
};

export default Deck;
