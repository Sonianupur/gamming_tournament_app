"use client";

import { useState, useEffect } from "react";
import { auth } from "@/firebase/firebase";
import RegisterForm from "./RegisterForm";

const TournamentCard = ({ tournament, id }) => {
  const [user, setUser] = useState(null);
  const [spotsLeft, setSpotsLeft] = useState(null);

  // Set user and available spots on mount
  useEffect(() => {
    setUser(auth.currentUser);
    setSpotsLeft(tournament.remainingSpots ?? tournament.totalSpots ?? 0);
  }, [tournament]);

  return (
    <div className="border p-4 rounded shadow mb-4">
      <h2 className="text-xl font-bold">{tournament.title}</h2>
      <p>Date: {tournament.date}</p>
      <p>Location: {tournament.location}</p>
      <p>
        Spots Left:{" "}
        <span className={spotsLeft > 0 ? "text-green-600" : "text-red-500"}>
          {spotsLeft !== null ? spotsLeft : "Loading..."}
        </span>
      </p>

      {/* ✅ Register button logic is moved into this reusable component */}
      {user ? (
        <RegisterForm
          tournamentId={id}
          title={tournament.title}
          currentSpots={spotsLeft}
          onSpotsUpdate={setSpotsLeft}
        />
      ) : (
        <p className="text-sm text-gray-600 mt-2">
          Please login to register.
        </p>
      )}
    </div>
  );
};

export default TournamentCard;
