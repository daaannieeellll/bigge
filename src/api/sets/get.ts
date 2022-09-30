import { readSet } from "@/utils/firestore/crud";
import type { ApiError } from "@/types/errors";

const getSets = async (id: string) =>
  readSet(id)
    .then((doc) => {
      if (!doc.exists)
        throw { statusCode: 404, message: "Set not found" } as ApiError;
      return doc.data();
    })
    .catch(() => {
      throw { statusCode: 400, message: "Could not get set" } as ApiError;
    });

export { getSets };
