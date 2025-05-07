"use client";

import { useEffect, useState } from "react";
import { db, auth } from "@/firebase/firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { useRouter } from "next/navigation";

const ManageTournaments = () => {
  const [tournaments, setTournaments] = useState([]);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        setRole("guest");
        setLoading(false);
        return;
      }

      try {
        const userRef = doc(db, "users", user.uid);
        const snap = await getDoc(userRef);
        if (snap.exists()) {
          const data = snap.data();
          setRole(data.role);
          if (data.role === "admin") {
            await fetchTournaments();
          }
        } else {
          console.warn("No user document found.");
          setRole("guest");
        }
      } catch (err) {
        console.error("Failed to fetch user role:", err);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchTournaments = async () => {
    try {
      const snapshot = await getDocs(collection(db, "tournaments"));
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTournaments(data);
    } catch (err) {
      console.error("Error fetching tournaments:", err);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this tournament?");
    if (!confirmed) return;

    try {
      await deleteDoc(doc(db, "tournaments", id));
      fetchTournaments();
    } catch (err) {
      console.error("Error deleting tournament:", err);
    }
  };

  if (loading) return <p className="p-4">Loading...</p>;
  if (role !== "admin") return <p className="text-red-600 p-4">Access denied. Admins only.</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Tournaments</h1>
      {tournaments.length === 0 ? (
        <p>No tournaments available.</p>
      ) : (
        tournaments.map((t) => (
          <div key={t.id} className="border p-4 rounded shadow mb-4">
            <h2 className="text-xl font-semibold">{t.title}</h2>
            <p>Date: {t.date}</p>
            <p>Location: {t.location}</p>
            <p>Spots: {t.remainingSpots} / {t.totalSpots}</p>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => router.push(`/admin/edit-tournament/${t.id}`)}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(t.id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ManageTournaments;
