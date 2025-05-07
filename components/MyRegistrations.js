"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/firebase/firebase";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

const MyRegistrations = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false); // SSR-safe flag

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchRegistrations = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const q = query(
        collection(db, "registrations"),
        where("userId", "==", user.uid)
      );

      const querySnapshot = await getDocs(q);
      const regList = [];

      for (const docSnap of querySnapshot.docs) {
        const regData = docSnap.data();
        const tournamentRef = doc(db, "tournaments", regData.tournamentId);
        const tournamentSnap = await getDoc(tournamentRef);
        const tournamentData = tournamentSnap.exists()
          ? tournamentSnap.data()
          : {};

        regList.push({
          id: docSnap.id,
          ...regData,
          ...tournamentData,
        });
      }

      setRegistrations(regList);
      setLoading(false);
    };

    fetchRegistrations();
  }, []);

  const handleCancel = async (reg) => {
    try {
      await deleteDoc(doc(db, "registrations", reg.id));

      const tournamentRef = doc(db, "tournaments", reg.tournamentId);
      const tournamentSnap = await getDoc(tournamentRef);
      if (tournamentSnap.exists()) {
        const remaining = tournamentSnap.data().remainingSpots ?? 0;
        await updateDoc(tournamentRef, {
          remainingSpots: remaining + 1,
        });
      }

      setRegistrations((prev) => prev.filter((r) => r.id !== reg.id));
    } catch (err) {
      console.error("Cancel failed:", err);
    }
  };

  if (!mounted) return null;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Tournament History</h1>
      {loading ? (
        <p>Loading...</p>
      ) : registrations.length === 0 ? (
        <p>You have not registered for any tournaments.</p>
      ) : (
        <ul className="space-y-4">
          {registrations.map((reg) => (
            <li key={reg.id} className="border p-4 rounded shadow-sm">
              <h2 className="text-lg font-semibold">{reg.title}</h2>
              <p>Date: {reg.date}</p>
              <p>Location: {reg.location}</p>
              <p>Status: Registered</p>
              <p>
                Registered At:{" "}
                {reg.timestamp && typeof reg.timestamp.toDate === "function"
                  ? reg.timestamp.toDate().toLocaleString()
                  : "N/A"}
              </p>
              <button
                onClick={() => handleCancel(reg)}
                className="mt-2 px-4 py-1 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Cancel Registration
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyRegistrations;
