"use client";

import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/firebase/firebase";

const AddTournament = () => {
  const [form, setForm] = useState({
    title: "",
    date: "",
    location: "",
    totalSpots: "",
    latitude: "",
    longitude: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const { title, date, location, totalSpots, latitude, longitude } = form;

    if (!title || !date || !location || !totalSpots || !latitude || !longitude) {
      setError("All fields are required.");
      return;
    }

    const latNum = parseFloat(latitude);
    const lngNum = parseFloat(longitude);
    if (isNaN(latNum) || isNaN(lngNum)) {
      setError("Latitude and Longitude must be valid numbers.");
      return;
    }

    try {
      await addDoc(collection(db, "tournaments"), {
        title,
        date,
        location,
        totalSpots: Number(totalSpots),
        remainingSpots: Number(totalSpots),
        latitude: latNum,
        longitude: lngNum,
        registeredUsers: [],
      });

      setSuccess("✅ Tournament added successfully!");
      setForm({
        title: "",
        date: "",
        location: "",
        totalSpots: "",
        latitude: "",
        longitude: "",
      });
    } catch (err) {
      console.error("Error adding tournament:", err);
      setError("❌ Failed to add tournament.");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add Tournament</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Game Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="border p-2 w-full rounded"
        />

        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          className="border p-2 w-full rounded"
        />

        <input
          type="text"
          placeholder="Location"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
          className="border p-2 w-full rounded"
        />

        <input
          type="number"
          placeholder="Total Spots"
          value={form.totalSpots}
          onChange={(e) => setForm({ ...form, totalSpots: e.target.value })}
          className="border p-2 w-full rounded"
        />

        <input
          type="text"
          placeholder="Latitude (e.g., 51.5074)"
          value={form.latitude}
          onChange={(e) => setForm({ ...form, latitude: e.target.value })}
          className="border p-2 w-full rounded"
        />

        <input
          type="text"
          placeholder="Longitude (e.g., -0.1278)"
          value={form.longitude}
          onChange={(e) => setForm({ ...form, longitude: e.target.value })}
          className="border p-2 w-full rounded"
        />

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add Tournament
        </button>
      </form>

      {error && <p className="text-red-600 mt-2">{error}</p>}
      {success && <p className="text-green-600 mt-2">{success}</p>}
    </div>
  );
};

export default AddTournament;
