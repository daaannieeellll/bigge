import { postSets } from "@/api/sets/post";
import type { ApiError } from "@/types/errors";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let statusCode = 200;
  let responseData;
  try {
    if (req.method === "POST") {
      await postSets(req.body);
      statusCode = 201;
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
