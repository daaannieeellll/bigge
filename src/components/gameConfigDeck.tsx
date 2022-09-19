import BaseDeck from "@/components/baseDeck";
import CardContainer from "@/components/cardContainer";
import { minPlayerCount } from "@/constants/gameConfig";
import { ReactNode } from "react";

class GameConfigDeck extends BaseDeck<string, { players: string[] }> {
  constructor(props: {}) {
    super(props);
    this.addCard = this.addCard.bind(this);
  }

  protected initializeDeck(): void {
    this.setState({
      deck: [...Array(minPlayerCount)].map(
        (_, i) => `Speler ${minPlayerCount - i}:`
      ),
      cardCount: minPlayerCount,
      players: [],
    });
  }

  private addCard() {
    this.setState(({ deck, cardCount }) => {
      return {
        deck: [`Speler ${cardCount + 1}:`, ...deck],
        cardCount: cardCount + 1,
      };
    });
  }

  protected mapper(label: string, idx: number): ReactNode {
    return (
      <CardContainer
        key={this.state.cardCount - idx}
        onDiscard={() => {
          // check if player name contains at least three characters
          // otherwise deny discarding
          const player = this.state.players[this.state.cardCount - idx - 1];
          if (!player || player.length < 3) return false;

          // player name approved, add new card
          this.addCard();
          return true;
        }}
      >
        <div
          className='
            w-full h-full
            flex items-center flex-col justify-around
          '
        >
          <div className='w-3/4 select-none'>
            <img src={`/images/types/Bigge.svg`} alt='Bigge' />
          </div>
          <div
            className='
              h-1/3 w-full
              flex flex-col items-center justify-start
              font-providence text-lg
            '
          >
            <label>{label}</label>
            <input
              className='
                w-3/4
                bg-transparent
                border-b-2 border-gray-500 border-dashed
                text-center text-md
              '
              onBlur={(e) => {
                this.setState(({ players }) => {
                  // insert/update player name when input loses focus
                  const newPlayers = [...players];
                  // TODO: check if value === ''
                  newPlayers[this.state.cardCount - idx - 1] = e.target.value;
                  return { players: newPlayers };
                });
              }}
            />
          </div>
        </div>
      </CardContainer>
    );
  }
}

export default GameConfigDeck;
