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
import Layout from "@/components/Layout";

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

  return (
    <Layout>
      <div className="p-6 min-h-screen text-white">
        <h1 className="text-2xl font-bold mb-6 text-center">Manage Tournaments</h1>

        {loading ? (
          <p className="text-center text-gray-300">Loading...</p>
        ) : role !== "admin" ? (
          <p className="text-red-400 text-center">Access denied. Admins only.</p>
        ) : tournaments.length === 0 ? (
          <p className="text-center text-gray-400">No tournaments available.</p>
        ) : (
          <div className="space-y-6 max-w-3xl mx-auto">
            {tournaments.map((t) => (
              <div key={t.id} className="bg-black bg-opacity-60 p-4 rounded shadow">
                <h2 className="text-xl font-semibold">{t.title}</h2>
                <p>Date: {t.date}</p>
                <p>Location: {t.location}</p>
                <p>Spots: {t.remainingSpots} / {t.totalSpots}</p>
                <div className="flex gap-3 mt-3">
                  <button
                    onClick={() => router.push(`/admin/edit-tournament/${t.id}`)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(t.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ManageTournaments;
