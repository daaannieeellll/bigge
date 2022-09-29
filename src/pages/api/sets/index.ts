import { Timestamp } from "firebase-admin/firestore";
import { createUserSet } from "@/utils/firestore/crud";
import { validateUserSet } from "@/utils/firestore/validators";
import { firestore } from "@/services/firebase/admin";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  req.statusCode = 200;
  const statusCode = 200;

  if (req.method === "POST") {
    if (validateUserSet(req.body)) {
      const { name, types, probabilities, colors } = req.body;
      const created = Timestamp.now();
      const owner = firestore.doc("users/bigge");
      const saves = 0;
      const cards = firestore.doc("cards/bigge");
      await createUserSet({
        name,
        types,
        probabilities,
        colors,
        created,
        owner,
        saves,
        cards,
      }).catch((error) => {
        res.json({ error });
      });
    } else res.statusCode = 400;
  } else res.statusCode = 405;
  res.statusCode = statusCode;
  res.end();
};
export default handler;
