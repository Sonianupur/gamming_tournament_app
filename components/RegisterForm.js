"use client";

import { useState } from "react";
import { auth, db } from "@/firebase/firebase";
import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore";

const RegisterForm = ({ tournamentId, title, currentSpots, onSpotsUpdate }) => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    const user = auth.currentUser;
    if (!user) {
      setMessage("You must be logged in.");
      return;
    }

    try {
      setLoading(true);
      const ref = doc(db, "tournaments", tournamentId);
      const snap = await getDoc(ref);
      const data = snap.data();
      const remaining = data.remainingSpots ?? data.totalSpots ?? 0;

      if (remaining <= 0) {
        setMessage("Tournament is full.");
        return;
      }

      // Save registration
      await setDoc(doc(db, "registrations", `${user.uid}_${tournamentId}`), {
        userId: user.uid,
        tournamentId,
        title,
        timestamp: new Date(),
      });

      await updateDoc(ref, {
        remainingSpots: remaining - 1,
      });

      setMessage("✅ Successfully registered!");
      onSpotsUpdate(remaining - 1); // callback to update UI
    } catch (err) {
      console.error("Error during registration:", err);
      setMessage("❌ Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-2">
      <button
        onClick={handleRegister}
        disabled={loading || currentSpots <= 0}
        className={`px-4 py-2 rounded text-white ${
          currentSpots <= 0
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {currentSpots <= 0 ? "Full" : loading ? "Registering..." : "Register"}
      </button>
      {message && <p className="text-sm mt-2 text-blue-600">{message}</p>}
    </div>
  );
};

export default RegisterForm;
