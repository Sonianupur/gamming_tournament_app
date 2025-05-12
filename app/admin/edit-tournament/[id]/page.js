"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { auth, db } from "@/firebase/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import Layout from "@/components/Layout"; // ✅ Import Layout

const EditTournamentPage = () => {
  const { id } = useParams();
  const router = useRouter();

  const [userRole, setUserRole] = useState(null);
  const [form, setForm] = useState({
    title: "",
    date: "",
    location: "",
    totalSpots: "",
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Auth check
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        console.warn("⚠️ User not logged in");
        setLoading(false);
        return;
      }

      try {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const role = userDoc.data().role;
          setUserRole(role);
        } else {
          console.warn("❌ No user document found.");
        }
      } catch (err) {
        console.error("Error fetching user role:", err);
      }
    });
    return () => unsubscribe();
  }, []);

  // Load tournament data
  useEffect(() => {
    const fetchTournament = async () => {
      try {
        const docRef = doc(db, "tournaments", id);
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          const data = snap.data();
          setForm({
            title: data.title || "",
            date: data.date || "",
            location: data.location || "",
            totalSpots: data.totalSpots || "",
          });
        }
      } catch (err) {
        console.error("Error fetching tournament:", err);
        setMessage("Failed to load tournament data.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchTournament();
  }, [id]);

  // Submit updated form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateDoc(doc(db, "tournaments", id), {
        title: form.title,
        date: form.date,
        location: form.location,
        totalSpots: Number(form.totalSpots),
      });
      setMessage("✅ Tournament updated!");
    } catch (err) {
      console.error("Update failed:", err);
      setMessage("❌ Failed to update tournament.");
    }
  };

  if (loading) return <Layout><p className="p-4">Loading...</p></Layout>;
  if (userRole !== "admin")
    return <Layout><p className="text-red-600 p-4">Access denied. Admins only.</p></Layout>;

  return (
    <Layout>
      <div className="p-6 max-w-xl mx-auto text-white">
        <h2 className="text-2xl font-bold mb-4">Edit Tournament</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Game Title"
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
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            placeholder="Location"
            className="border p-2 w-full rounded"
          />
          <input
            type="number"
            value={form.totalSpots}
            onChange={(e) => setForm({ ...form, totalSpots: e.target.value })}
            placeholder="Total Spots"
            className="border p-2 w-full rounded"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Update Tournament
          </button>
        </form>
        {message && <p className="mt-2 text-blue-400">{message}</p>}
      </div>
    </Layout>
  );
};

export default EditTournamentPage;
