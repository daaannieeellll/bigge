import type {
  DocumentData,
  QueryDocumentSnapshot,
} from "firebase-admin/firestore";
import type { Cards, Set } from "@/types/firestore/data";

const setConverter = {
  toFirestore(set: Set): DocumentData {
    return { ...set };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): Set {
    const data = snapshot.data();
    return {
      name: data.name,
      owner: data.owner,
      saves: data.saves,
      created: data.created,
      types: data.types,
      probabilities: data.probabilities,
      colors: data.colors,
      cards: data.cards,
    } as Set;
  },
};

const cardsConverter = {
  toFirestore(cards: string[][]): DocumentData {
    const converted: Cards = cards.map((cardData) => ({
      data: cardData,
    }));
    return { data: converted };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): string[][] {
    const { data } = snapshot.data() as { data: Cards };
    return data.map((card) => card.data);
  },
};

export { setConverter, cardsConverter };
