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

export default function MyRegistrations() {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchRegistrations = async () => {
      const user = auth.currentUser;
      if (!user) return;

      try {
        const q = query(
          collection(db, "registrations"),
          where("userId", "==", user.uid)
        );
        const snapshot = await getDocs(q);

        const regList = [];

        for (const docSnap of snapshot.docs) {
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
      } catch (err) {
        console.error("Error fetching registrations:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, []);

  const handleCancel = async (reg) => {
    try {
      await deleteDoc(doc(db, "registrations", reg.id));

      const tournamentRef = doc(db, "tournaments", reg.tournamentId);
      const tournamentSnap = await getDoc(tournamentRef);
      if (tournamentSnap.exists()) {
        const currentSpots = tournamentSnap.data().remainingSpots ?? 0;
        await updateDoc(tournamentRef, {
          remainingSpots: currentSpots + 1,
        });
      }

      setRegistrations((prev) => prev.filter((r) => r.id !== reg.id));
    } catch (error) {
      console.error("Cancel failed:", error);
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-[70vh] px-6 py-12 text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">
        My Tournament Registrations
      </h1>

      {loading ? (
        <p className="text-center text-gray-300">Loading...</p>
      ) : registrations.length === 0 ? (
        <p className="text-center text-gray-400">No registrations found.</p>
      ) : (
        <div className="space-y-6 max-w-3xl mx-auto">
          {registrations.map((reg) => (
            <div
              key={reg.id}
              className="bg-black bg-opacity-60 border border-gray-700 p-6 rounded shadow"
            >
              <h2 className="text-xl font-semibold mb-1">{reg.title || "Untitled Tournament"}</h2>
              <p className="text-sm text-gray-300">📅 Date: {reg.date || "N/A"}</p>
              <p className="text-sm text-gray-300">📍 Location: {reg.location || "N/A"}</p>
              <p className="text-sm text-gray-400 italic mb-2">
                Registered at:{" "}
                {reg.timestamp?.toDate
                  ? reg.timestamp.toDate().toLocaleString()
                  : "Unknown"}
              </p>
              <button
                onClick={() => handleCancel(reg)}
                className="mt-2 px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition"
              >
                Cancel Registration
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
