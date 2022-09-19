import { Component, ReactNode } from "react";

interface IDeckState<T = any> {
  deck: T[];
  cardCount: number;
}

abstract class BaseDeck<
  T,
  U extends { [key: string]: any } = { [key: string]: any }
> extends Component<{ [key: string]: any }, IDeckState<T> & U> {
  constructor(props: { [key: string]: any }) {
    super(props);
    this.state = { deck: [] as T[], cardCount: 0 } as IDeckState<T> & U;
    this.initializeDeck = this.initializeDeck.bind(this);
    this.mapper = this.mapper.bind(this);
  }

  // deck initialization
  protected initializeDeck() {}
  componentDidMount() {
    this.initializeDeck();
  }

  // mapper is called for each element on the deck
  protected abstract mapper(value: T, index: number, array: T[]): ReactNode;
  render() {
    return this.state.deck.map(this.mapper);
  }
}

export default BaseDeck;
