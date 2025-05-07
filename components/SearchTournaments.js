"use client";
import React, { useState } from "react";
import { searchTournaments } from "./firebase/dbUtils";

const SearchTournaments = () => {
  const [form, setForm] = useState({ gameTitle: "", date: "", location: "" });
  const [results, setResults] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSearch = async () => {
    const data = await searchTournaments(form);
    setResults(data);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Search Tournaments</h2>
      <div className="flex gap-2 mb-4">
        <input type="text" name="gameTitle" placeholder="Game Title" value={form.gameTitle} onChange={handleChange} className="border p-2" />
        <input type="date" name="date" value={form.date} onChange={handleChange} className="border p-2" />
        <input type="text" name="location" placeholder="Location" value={form.location} onChange={handleChange} className="border p-2" />
        <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 rounded">Search</button>
      </div>
      <ul>
        {results.map((tournament) => (
          <li key={tournament.id} className="border-b py-2">
            <strong>{tournament.gameTitle}</strong> - {tournament.date} - {tournament.location}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchTournaments;
