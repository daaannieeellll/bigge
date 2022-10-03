import { firestore } from "@/services/firebase/admin";
import { cardsConverter, setConverter } from "./converters";
import type { Set } from "@/types/firestore/data";

/* CREATE */
const createSet = async (data: Set, id?: string) =>
  id
    ? firestore.collection("sets").doc(id).withConverter(setConverter).set(data)
    : firestore.collection("sets").withConverter(setConverter).add(data);
const createCards = async (data: string[][]) =>
  firestore.collection("cards").withConverter(cardsConverter).add(data);

/* READ */
const readSet = async (id: string) =>
  firestore.collection("sets").doc(id).withConverter<Set>(setConverter).get();
const readCards = async (id: string) =>
  firestore
    .collection("cards")
    .doc(id)
    .withConverter<string[][]>(cardsConverter)
    .get();

/* UPDATE */
const updateSet = async <K extends keyof Set>(
  id: string,
  data: Set | Pick<Set, K>
) => {
  const doc = firestore.collection("sets").doc(id);
  const set = await doc.get();
  return set.exists ? doc.withConverter(setConverter).update(data) : null;
};
const updateCards = async (id: string, data: string[][]) => {
  const doc = firestore.collection("cards").doc(id);
  const cards = await doc.get();
  return cards.exists ? doc.withConverter(cardsConverter).set(data) : null;
};

/* DELETE */
const deleteSet = async (id: string) => firestore.doc(`sets/${id}`).delete();
const deleteCards = async (id: string) => firestore.doc(`cards/${id}`).delete();

export {
  createSet,
  readSet,
  updateSet,
  deleteSet,
  createCards,
  readCards,
  updateCards,
  deleteCards,
};
