import { getCards } from "@/api/cards/get";
import { putCards } from "@/api/cards/put";
import { deleteCards } from "@/api/cards/delete";
import type { ApiError } from "@/types/errors";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let statusCode = 200;
  let responseData;

  try {
    const { id } = req.query;
    if (typeof id !== "string") {
      statusCode = 400;
    } else if (req.method === "GET") {
      responseData = await getCards(id);
    } else if (req.method === "PUT") {
      await putCards(req.body, id);
    } else if (req.method === "DELETE") {
      await deleteCards(id);
    } else statusCode = 405;
  } catch (e) {
    const error = e as ApiError;
    statusCode = error.statusCode;
    responseData = { error: error.message };
  }

  res.statusCode = statusCode;
  res.json(responseData);
};
export default handler;
