import { updateCards } from "@/utils/firestore/crud";
import { validateCards } from "@/utils/firestore/validators";
import type { ApiError } from "@/types/errors";

const putCards = async (data: any, id: string) => {
  if (!validateCards(data))
    throw { statusCode: 400, message: "Invalid card data" } as ApiError;

  if (id)
    await updateCards(id, data.cards).catch(() => {
      throw { statusCode: 400, message: "Could not create cards" } as ApiError;
    });
};

export { putCards };
