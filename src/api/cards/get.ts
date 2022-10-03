import { ApiError } from "@/types/errors";
import { readCards } from "@/utils/firestore/crud";

const getCards = async (id: string) =>
  await readCards(id).then((doc) => {
    if (!doc.exists)
      throw { statusCode: 404, message: "Cards not found" } as ApiError;
    return doc.data();
  });

export { getCards };
