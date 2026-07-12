import { getFirestore, type Firestore } from "firebase/firestore";
import { getFirebaseApp } from "./configuration";

let firestoreInstance: Firestore | undefined;

export function getDb(): Firestore {
  if (!firestoreInstance) {
    firestoreInstance = getFirestore(getFirebaseApp());
  }
  return firestoreInstance;
}
