import type { DocumentReference, Timestamp } from "firebase-admin/firestore";

export interface Set {
  name: string;
  owner: DocumentReference;
  saves: number;
  created: Timestamp;
  types: string[];
  probabilities: number[];
  colors: string[];
  cards: DocumentReference;
}

export type Cards = { data: string[] }[];
