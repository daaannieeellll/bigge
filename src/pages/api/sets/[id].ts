import { Timestamp } from "firebase-admin/firestore";
import {
  createUserSet,
  deleteUserSet,
  readUserSet,
  updateUserSet,
} from "@/utils/firestore/crud";
import {
  removeUndefined,
  validateUserSet,
  validateUserSetSubset,
} from "@/utils/firestore/validators";
import { firestore } from "@/services/firebase/admin";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  req.statusCode = 200;
  let statusCode = 200;

  const { id } = req.query;
  if (typeof id === "string") {
    switch (req.method) {
      case "GET": {
        const set = await readUserSet(id);
        if (set) res.json(set);
        else res.json({ error: "Set not found" });
        break;
      }
      case "POST": {
        if (validateUserSet(req.body)) {
          const { name, types, probabilities, colors } = req.body;
          const created = Timestamp.now();
          const saves = 0;
          const owner = firestore.doc("users/bigge");
          const cards = firestore.doc(`cards/${id}`);
          await createUserSet(
            {
              name,
              types,
              probabilities,
              colors,
              created,
              owner,
              saves,
              cards,
            },
            id
          ).catch((error) => {
            res.json({ error });
          });
        } else statusCode = 400;
        break;
      }
      case "PUT": {
        if (validateUserSetSubset(req.body)) {
          const { name, types, probabilities, colors } = req.body;
          const newData = removeUndefined({
            name,
            types,
            probabilities,
            colors,
          });
          if (Object.keys(newData).length === 0) {
            statusCode = 400;
            break;
          }
          await updateUserSet(id, newData).catch((error) => {
            res.json({ error });
          });
        } else statusCode = 400;
        break;
      }
      case "DELETE": {
        deleteUserSet(id).catch((error) => {
          res.json({ error });
        });
        break;
      }
      default: {
        statusCode = 405;
      }
    }
  }
  res.statusCode = statusCode;
  res.end();
};
export default handler;
