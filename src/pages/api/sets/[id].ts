import { getSets } from "@/api/sets/get";
import { postSets } from "@/api/sets/post";
import { putSets } from "@/api/sets/put";
import { deleteSets } from "@/api/sets/delete";
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
      responseData = await getSets(id);
    } else if (req.method === "POST") {
      await postSets(req.body, id);
      statusCode = 201;
    } else if (req.method === "PUT") {
      await putSets(req.body, id);
    } else if (req.method === "DELETE") {
      await deleteSets(id);
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
