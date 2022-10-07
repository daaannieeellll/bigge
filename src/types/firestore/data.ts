import type { DocumentReference, Timestamp } from "firebase-admin/firestore";

export interface Set {
  name: string;
  types: string[];
  probabilities: number[];
  colors: string[];
  saves: number;
  created: Timestamp;
  ownerRef: DocumentReference;
  cardsRef: DocumentReference<string[][]>;
  cards: string[][];
  // populated fields
  owner?: string;
}

export type Cards = { data: string[] }[];
