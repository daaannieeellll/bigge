import BaseDeck from "@/components/baseDeck";
import CardContainer from "@/components/cardContainer";
import CardData from "@/components/cardData";
import { maxDeckSize } from "@/constants/gameConfig";
import { data } from "/data";
import type { ICardData } from "@/components/cardData";
import type { TypeInfo } from "@/types/card";

interface IDeckProps {
  onNewTopCard?: (arg: TypeInfo) => void;
}

class GameDeck extends BaseDeck<ICardData, {}, IDeckProps> {
  newTopCardHandler: (arg: TypeInfo) => void;

  constructor(props: IDeckProps) {
    super(props);

    this.addCard = this.addCard.bind(this);
    this.newTopCardHandler = props.onNewTopCard ?? ((type: TypeInfo) => {});
  }

  override initializeDeck(): void {
    const initialCards = [...Array(maxDeckSize - 1)].map(() =>
      this.context.getCard()
    );
    this.setState({ deck: initialCards, cardCount: initialCards.length });
  }

  mapper(card: ICardData, idx: number) {
    // only call handler for top card
    if (idx === 1)
      this.newTopCardHandler({
        id: card.id,
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
    const cardData = this.context.getCard();
    this.setState(({ deck: prevDeck, cardCount }) => {
      const deck =
        prevDeck.length < maxDeckSize
          ? [cardData, ...prevDeck]
          : [cardData, ...prevDeck.slice(0, -1)];

      return { deck, cardCount: cardCount + 1 };
    });
  }
}

export default GameDeck;
