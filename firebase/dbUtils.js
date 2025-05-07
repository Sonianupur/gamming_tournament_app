import { db } from "./firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export const searchTournaments = async ({ gameTitle, date, location }) => {
  const tournamentsRef = collection(db, "tournaments");
  let q = tournamentsRef;

  if (gameTitle) {
    q = query(q, where("gameTitle", "==", gameTitle));
  }
  if (date) {
    q = query(q, where("date", "==", date));
  }
  if (location) {
    q = query(q, where("location", "==", location));
  }

  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
