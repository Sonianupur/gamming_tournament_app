"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import dynamic from "next/dynamic";

const TournamentMap = dynamic(() => import("@/components/TournamentMap"), {
  ssr: false,
});

export default function TournamentMapPage() {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTournaments = async () => {
      const snapshot = await getDocs(collection(db, "tournaments"));
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTournaments(data);
      setLoading(false);
    };

    fetchTournaments();
  }, []);

  if (loading) return <p className="text-center p-6">Loading map...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Tournament Map</h1>
      <TournamentMap tournaments={tournaments} />
    </div>
  );
}
