import { deleteCards as _deleteCards } from "@/utils/firestore/crud";
import type { ApiError } from "@/types/errors";

const deleteCards = async (id: string) =>
  await _deleteCards(id).catch(() => {
    throw { statusCode: 400, message: "Could not delete cards" } as ApiError;
  });

export { deleteCards };
