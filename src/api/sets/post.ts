import { Timestamp } from "firebase-admin/firestore";
import { firestore } from "@/services/firebase/admin";
import { createSet, createCards } from "@/utils/firestore/crud";
import { validateCards, validateSet } from "@/utils/firestore/validators";
import type { ApiError } from "@/types/errors";
import type { Set } from "@/types/firestore/data";

const postSets = async (data: any, id?: string) => {
  if (!validateSet(data))
    throw { statusCode: 400, message: "Invalid set data" } as ApiError;
  if (!validateCards(data))
    throw { statusCode: 400, message: "Invalid card data" } as ApiError;

  const cardsRef = await createCards(data.cards as string[][]).catch(() => {
    throw { statusCode: 400, message: "Could not create cards" } as ApiError;
  });

  const set: Set = {
    name: data.name,
    ownerRef: firestore.doc("users/bigge"),
    saves: 0,
    created: Timestamp.now(),
    types: data.types,
    probabilities: data.probabilities,
    colors: data.colors,
    cardsRef,
  };

  await createSet(set, id).catch(() => {
    throw { statusCode: 400, message: "Could not create set" } as ApiError;
  });
};

export { postSets };
