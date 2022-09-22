import { data } from "/data";

const getCardData = () => {
  const id = (Math.random() * data.meta.types.length) | 0;
  return {
    id,
    type: data.meta.types[id],
    text: data.cards[id][(Math.random() * data.cards[id].length) | 0],
  };
};

const getPlayerId = (nPlayers: number, id: number) => {
  // get a random player from the players list
  const playerId = (Math.random() * nPlayers) | 0;
  return playerId;
};

export { getCardData, getPlayerId };
