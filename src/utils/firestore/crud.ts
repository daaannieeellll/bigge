import { firestore } from "@/services/firebase/admin";
import { cardsConverter, userSetConverter } from "./converters";
import type { UserSet } from "@/types/firestore/data";

/* CREATE */
const createUserSet = async (data: UserSet, id?: string) => {
  if (id)
    return await firestore
      .collection("sets")
      .doc(id)
      .withConverter(userSetConverter)
      .set(data);
  else
    return await firestore
      .collection("sets")
      .withConverter(userSetConverter)
      .add(data);
};
const createCards = async (data: string[][], id: string) => {
  return await firestore
    .collection("cards")
    .doc(id)
    .withConverter(cardsConverter)
    .set(data);
};

/* READ */
const readUserSet = async (id: string) => {
  const setSnapshot = await firestore
    .collection("sets")
    .doc(id)
    .withConverter<UserSet>(userSetConverter)
    .get();
  return setSnapshot.data();
};
const readCards = async (id: string) => {
  const cardsSnapshot = await firestore
    .collection("cards")
    .doc(id)
    .withConverter<string[][]>(cardsConverter)
    .get();
  return cardsSnapshot.data();
};

/* UPDATE */
const updateUserSet = async <K extends keyof UserSet>(
  id: string,
  data: Pick<UserSet, K> | UserSet
) => {
  return await firestore
    .doc(`sets/${id}`)
    .withConverter(userSetConverter)
    .update(data);
};
const updateCards = async (id: string, data: string[][]) => {
  return createCards(data, id);
};

/* DELETE */
const deleteUserSet = async (id: string) => {
  return await firestore.doc(`sets/${id}`).delete();
};
const deleteCards = async (id: string) => {
  return await firestore.doc(`cards/${id}`).delete();
};

export {
  createUserSet,
  readUserSet,
  updateUserSet,
  deleteUserSet,
  createCards,
  readCards,
  updateCards,
  deleteCards,
};
