import { Component, ReactNode } from "react";

interface IDeckState<T = any> {
  deck: T[];
  cardCount: number;
}

abstract class BaseDeck<
  DeckContent,
  ExtraStates extends { [key: string]: any } = { [key: string]: any },
  Props extends { [key: string]: any } = { [key: string]: any }
> extends Component<Props, IDeckState<DeckContent> & ExtraStates> {
  constructor(props: Props) {
    super(props);
    this.state = {
      deck: [] as DeckContent[],
      cardCount: 0,
    } as IDeckState<DeckContent> & ExtraStates;
    this.initializeDeck = this.initializeDeck.bind(this);
    this.mapper = this.mapper.bind(this);
  }

  // deck initialization
  protected initializeDeck() {}
  componentDidMount() {
    this.initializeDeck();
  }

  // mapper is called for each element on the deck
  protected abstract mapper(
    value: DeckContent,
    index: number,
    array: DeckContent[]
  ): ReactNode;

  // render additional elements after deck
  protected renderAdditional() {}
  render() {
    return (
      <>
        <div
          className='
            w-full h-full
            grid grid-cols-1 grid-rows-1 justify-items-center items-center
          '
        >
          {this.state.deck.map(this.mapper)}
          {this.renderAdditional()}
        </div>
      </>
    );
  }
}

export default BaseDeck;
