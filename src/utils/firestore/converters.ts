import type { Cards, UserSet } from "@/types/firestore/data";
import type {
  DocumentData,
  QueryDocumentSnapshot,
} from "firebase-admin/firestore";

const userSetConverter = {
  toFirestore(userSet: UserSet): DocumentData {
    return { ...userSet };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): UserSet {
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
    } as UserSet;
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

export { userSetConverter, cardsConverter };
