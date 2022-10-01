import type {
  DocumentData,
  QueryDocumentSnapshot,
} from "firebase-admin/firestore";
import type { Cards, Set } from "@/types/firestore/data";

interface Converter<T> {
  toFirestore: (data: T) => DocumentData;
  fromFirestore: (snapshot: QueryDocumentSnapshot) => T;
}

const setConverter: Converter<Set> = {
  toFirestore(set): DocumentData {
    const { cards, owner, ...data } = set;
    return data;
  },
  fromFirestore(snapshot: QueryDocumentSnapshot) {
    const data = snapshot.data();
    return {
      name: data.name,
      owner: data.owner,
      saves: data.saves,
      created: data.created,
      types: data.types,
      probabilities: data.probabilities,
      colors: data.colors,
      cardsRef: data.cardsRef,
    } as Set;
  },
};

const cardsConverter: Converter<string[][]> = {
  toFirestore(cards): DocumentData {
    const converted: Cards = cards.map((cardData) => ({
      data: cardData,
    }));
    return { data: converted };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot) {
    const { data } = snapshot.data() as { data: Cards };
    return data.map((card) => card.data);
  },
};

export { setConverter, cardsConverter };
