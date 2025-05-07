// components/SearchPage.js
"use client";

import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import TournamentCard from "./TournamentCard"; // Update path if needed

const SearchPage = () => {
  const [tournaments, setTournaments] = useState([]);
  const [search, setSearch] = useState({ title: "", date: "", location: "" });

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "tournaments"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTournaments(data);
      } catch (error) {
        console.error("Error fetching tournaments:", error);
      }
    };

    fetchTournaments();
  }, []);

  const filteredTournaments = tournaments.filter((t) => {
    return (
      (!search.title || t.title.toLowerCase().includes(search.title.toLowerCase())) &&
      (!search.date || t.date === search.date) &&
      (!search.location || t.location.toLowerCase().includes(search.location.toLowerCase()))
    );
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Search Tournaments</h1>

      <div className="mb-6 grid gap-4 grid-cols-1 md:grid-cols-3">
        <input
          type="text"
          placeholder="Search by game title"
          className="p-2 border rounded"
          value={search.title}
          onChange={(e) => setSearch({ ...search, title: e.target.value })}
        />
        <input
          type="date"
          className="p-2 border rounded"
          value={search.date}
          onChange={(e) => setSearch({ ...search, date: e.target.value })}
        />
        <input
          type="text"
          placeholder="Search by location"
          className="p-2 border rounded"
          value={search.location}
          onChange={(e) => setSearch({ ...search, location: e.target.value })}
        />
      </div>

      <ul className="space-y-4">
        {filteredTournaments.length > 0 ? (
          filteredTournaments.map((tournament) => (
            <TournamentCard key={tournament.id} id={tournament.id} tournament={tournament} />
          ))
        ) : (
          <p>No tournaments match your search.</p>
        )}
      </ul>
    </div>
  );
};

export default SearchPage;
