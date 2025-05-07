// app/tournament/[id]/page.js
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";

const TournamentDetailsPage = () => {
  const { id } = useParams();
  const [tournament, setTournament] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTournament = async () => {
      try {
        const ref = doc(db, "tournaments", id);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setTournament(snap.data());
        }
      } catch (err) {
        console.error("Error fetching tournament:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTournament();
  }, [id]);

  if (loading) return <p className="p-6">Loading tournament details...</p>;

  if (!tournament) return <p className="p-6 text-red-600">Tournament not found.</p>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{tournament.title}</h1>
      <p><strong>Date:</strong> {tournament.date}</p>
      <p><strong>Location:</strong> {tournament.location}</p>
      <p><strong>Spots Left:</strong> {tournament.remainingSpots} / {tournament.totalSpots}</p>
    </div>
  );
};

export default TournamentDetailsPage;
