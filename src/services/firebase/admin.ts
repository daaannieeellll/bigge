import { initializeApp, getApps } from "firebase-admin/app";
import { credential } from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";

const serviceAccount = JSON.parse(
  String(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
);
const firebaseConfig = {
  credential: credential.cert(serviceAccount),
};

if (!getApps().length) initializeApp(firebaseConfig);
const firestore = getFirestore();

export { firestore };
