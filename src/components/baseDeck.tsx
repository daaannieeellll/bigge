import { Component, ReactNode } from "react";

interface IDeckState<T = any> {
  deck: T[];
  cardNo: number;
}

abstract class BaseDeck<T> extends Component<
  { [key: string]: any },
  IDeckState<T>
> {
  constructor(props: { [key: string]: any }) {
    super(props);
    this.state = { deck: [] as T[], cardNo: 0 };
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
    return <>{this.state.deck.map(this.mapper)}</>;
  }
}

export default BaseDeck;
