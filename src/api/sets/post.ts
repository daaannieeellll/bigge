import { Timestamp } from "firebase-admin/firestore";
import { firestore } from "@/services/firebase/admin";
import { createSet } from "@/utils/firestore/crud";
import { validateSet } from "@/utils/firestore/validators";
import type { ApiError } from "@/types/errors";
import type { Set } from "@/types/firestore/data";

const postSets = async (data: any, id?: string) => {
  if (!validateSet(data))
    throw { statusCode: 400, message: "Invalid set data" } as ApiError;

  const set: Set = {
    name: data.name,
    owner: firestore.doc("users/bigge"),
    saves: 0,
    created: Timestamp.now(),
    types: data.types,
    probabilities: data.probabilities,
    colors: data.colors,
    cards: firestore.doc(`cards/${id}`),
  };

  await createSet(set, id).catch(() => {
    throw { statusCode: 400, message: "Could not create set" } as ApiError;
  });
};

export { postSets };
