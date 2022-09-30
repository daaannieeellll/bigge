import { deleteSet } from "@/utils/firestore/crud";
import type { ApiError } from "@/types/errors";

const deleteSets = async (id: string) =>
  await deleteSet(id).catch(() => {
    throw { statusCode: 400, message: "Could not delete set" } as ApiError;
  });

export { deleteSets };
