import { readSet } from "@/utils/firestore/crud";
import { cardsConverter } from "@/utils/firestore/converters";
import type { ApiError } from "@/types/errors";

const getSets = async (id: string, includeCards?: string | string[]) =>
  await readSet(id)
    .then(async (doc) => {
      const data = doc.data();
      if (!doc.exists || !data)
        throw { statusCode: 404, message: "Set not found" } as ApiError;
      const { ownerRef, cardsRef, ...relevantData } = data;
      if (includeCards) {
        const cards = await (
          await cardsRef.withConverter(cardsConverter).get()
        )?.data();
        return { ...relevantData, cardsId: cardsRef.id, cards };
      } else return { ...relevantData, cardsId: cardsRef.id };
    })
    .catch(() => {
      throw { statusCode: 400, message: "Could not get set" } as ApiError;
    });

export { getSets };
