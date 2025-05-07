"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { useRouter } from "next/navigation";

const AdminTournamentList = () => {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchTournaments = async () => {
    try {
      const snapshot = await getDocs(collection(db, "tournaments"));
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTournaments(data);
    } catch (err) {
      console.error("Failed to fetch tournaments:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTournaments();
  }, []);

  const handleEdit = (id) => {
    router.push(`/admin/edit-tournament/${id}`);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this tournament?");
    if (!confirmed) return;

    try {
      await deleteDoc(doc(db, "tournaments", id));
      setTournaments((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error("Failed to delete tournament:", err);
    }
  };

  if (loading) return <p className="p-4">Loading tournaments...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Tournaments</h1>
      {tournaments.length === 0 ? (
        <p>No tournaments found.</p>
      ) : (
        <ul className="space-y-4">
          {tournaments.map((t) => (
            <li key={t.id} className="border p-4 rounded shadow-sm">
              <h2 className="text-lg font-semibold">{t.title}</h2>
              <p>Date: {t.date}</p>
              <p>Location: {t.location}</p>
              <p>Spots: {t.remainingSpots} / {t.totalSpots}</p>

              <div className="mt-2 flex space-x-2">
                <button
                  onClick={() => handleEdit(t.id)}
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(t.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminTournamentList;
