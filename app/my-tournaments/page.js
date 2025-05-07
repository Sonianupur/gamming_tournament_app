"use client";

import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "@/firebase/firebase";

const MyTournamentsPage = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRegistrations = async () => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      const q = query(
        collection(db, "registrations"),
        where("userId", "==", user.uid)
      );

      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRegistrations(data);
    } catch (error) {
      console.error("Error fetching registrations:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Registered Tournaments</h1>
      {loading ? (
        <p>Loading registrations...</p>
      ) : registrations.length === 0 ? (
        <p>You have not registered for any tournaments yet.</p>
      ) : (
        <ul className="space-y-4">
          {registrations.map((reg) => (
            <li key={reg.id} className="border p-4 rounded shadow-sm">
              <h2 className="text-lg font-semibold">{reg.title}</h2>
              <p>
                <strong>Tournament ID:</strong> {reg.tournamentId}
              </p>
              <p>
                <strong>Registered At:</strong>{" "}
                {reg.timestamp?.toDate().toISOString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyTournamentsPage;
