import { updateSet } from "@/utils/firestore/crud";
import { removeUndefined, validateSubSet } from "@/utils/firestore/validators";
import type { ApiError } from "@/types/errors";

const putSets = async (data: any, id: string) => {
  if (!validateSubSet(data))
    throw { statusCode: 400, message: "Invalid data" } as ApiError;

  const newData = removeUndefined({
    name: data.name,
    types: data.types,
    probabilities: data.probabilities,
    colors: data.colors,
  });

  if (Object.keys(newData).length === 0)
    throw { statusCode: 400, message: "No data to update" } as ApiError;

  await updateSet(id, newData).catch(() => {
    throw { statusCode: 400, message: "Could not update set" } as ApiError;
  });
};
export { putSets };
