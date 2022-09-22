import { ICardData } from "@/components/cardData";

const replaceAmountPlaceholders = (text: string, [first, second]: number[]) => {
  while (text.includes("%a")) {
    text = text.replace(
      /(%a)(\d)/,
      (m, p, q) =>
        `${
          (q === "0"
            ? 1 + Math.random() * first
            : 1 + first + Math.random() * second) | 0
        }`
    );
  }
  return text;
};

const replacePlayerPlaceholders = (
  { id, text }: ICardData,
  getPlayerFunc: (id: number) => string
) => {
  const chosenPlayers: string[] = [];
  while (text.includes("%p")) {
    const player = getPlayerFunc(id);
    if (chosenPlayers.includes(player)) continue;
    else chosenPlayers.push(player);
    text = text.replace("%p", player);
  }
  return text;
};

export { replaceAmountPlaceholders, replacePlayerPlaceholders };
