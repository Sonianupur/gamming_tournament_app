"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { auth, db } from "@/firebase/firebase";
import {
  collection,
  addDoc,
  doc,
  getDoc,
  updateDoc,
  Timestamp,
} from "firebase/firestore";

export default function RegisterTournament() {
  const { id } = useParams();
  const [confirmed, setConfirmed] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      if (u) {
        setUser(u);
      } else {
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleConfirm = async () => {
    setError("");
    if (!user) {
      setError("You must be logged in.");
      return;
    }

    try {
      // Get tournament details
      const tournamentRef = doc(db, "tournaments", id);
      const tournamentSnap = await getDoc(tournamentRef);

      if (!tournamentSnap.exists()) {
        setError("Tournament not found.");
        return;
      }

      const tournamentData = tournamentSnap.data();

      // Check for remaining spots
      if (tournamentData.remainingSpots <= 0) {
        setError("No spots available.");
        return;
      }

      // Add registration
      await addDoc(collection(db, "registrations"), {
        userId: user.uid,
        tournamentId: id,
        title: tournamentData.title,
        timestamp: Timestamp.now(),
      });

      // Decrease remaining spots
      await updateDoc(tournamentRef, {
        remainingSpots: tournamentData.remainingSpots - 1,
      });

      setConfirmed(true);
    } catch (err) {
      console.error(err);
      setError("Registration failed. Try again later.");
    }
  };

  return (
    <div className="min-h-screen p-6 text-white bg-gradient-to-br from-blue-900 to-green-900">
      <h1 className="text-3xl font-bold mb-4">Register for Tournament</h1>
      <p className="text-lg mb-6 italic">Tournament ID: {id}</p>

      <div className="bg-black bg-opacity-50 p-6 rounded shadow-md max-w-md">
        {error && (
          <p className="text-red-400 font-semibold text-sm mb-4">{error}</p>
        )}

        {!confirmed ? (
          <>
            <p className="text-sm mb-4">
              Confirm your spot by clicking the button below.
            </p>
            <button
              onClick={handleConfirm}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Confirm Registration
            </button>
          </>
        ) : (
          <p className="text-green-400 font-semibold text-lg">
            ✅ Registration confirmed!
          </p>
        )}
      </div>
    </div>
  );
}
