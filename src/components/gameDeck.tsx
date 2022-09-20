import BaseDeck from "@/components/baseDeck";
import CardContainer from "@/components/cardContainer";
import CardData from "@/components/cardData";

import { maxDeckSize } from "@/constants/gameConfig";
import { data } from "/data";

import type { ICardDataProps } from "@/components/cardData";
import type { TypeInfo } from "@/types/card";

interface IDeckProps {
  onNewTopCard?: (arg: TypeInfo) => void;
}

class GameDeck extends BaseDeck<ICardDataProps, {}, IDeckProps> {
  newTopCardHandler: (arg: TypeInfo) => void;

  constructor(props: IDeckProps) {
    super(props);

    this.addCard = this.addCard.bind(this);
    this.newTopCardHandler = props.onNewTopCard ?? ((type: TypeInfo) => {});
  }

  override initializeDeck(): void {
    const initialCards = [...Array(maxDeckSize - 1)].map(() => {
      const id = (Math.random() * data.meta.types.length) | 0;
      const type = data.meta.types[id];
      return {
        id,
        type,
        text: data.cards[id][(Math.random() * data.cards[id].length) | 0],
      };
    });
    this.setState({ deck: initialCards, cardCount: initialCards.length });
  }

  mapper(card: ICardDataProps, idx: number) {
    // only call handler for top card
    if (idx === 1)
      this.newTopCardHandler({
        color: data.meta.colors[card.id ?? 0],
      });

    return (
      <CardContainer
        key={this.state.cardCount - idx}
        onDiscard={() => {
          this.addCard();
          return true;
        }}
      >
        <CardData type={card.type} text={card.text} />
      </CardContainer>
    );
  }

  private addCard() {
    // get new card data
    const id = (Math.random() * data.meta.types.length) | 0;
    const type = data.meta.types[id];
    const text = data.cards[id][(Math.random() * data.cards[id].length) | 0];

    // store card data
    this.setState(({ deck: prevDeck, cardCount }) => {
      const deck =
        prevDeck.length < maxDeckSize
          ? [{ id, type, text }, ...prevDeck]
          : [{ id, type, text }, ...prevDeck.slice(0, -1)];

      return { deck, cardCount: cardCount + 1 };
    });
  }
}

export default GameDeck;
