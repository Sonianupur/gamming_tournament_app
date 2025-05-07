"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function AdminDashboard() {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchAdmin = async () => {
      const user = auth.currentUser;
      if (!user) return router.push("/login");

      const snap = await getDoc(doc(db, "users", user.uid));
      const data = snap.data();

      if (data.role !== "admin") return router.push("/user-dashboard");

      setName(data.name || "Admin");
      setEmail(user.email);
      setLoading(false);
    };

    fetchAdmin();
  }, [router]);

  const handleLogout = async () => {
    await auth.signOut();
    router.push("/login");
  };

  if (loading) return <p className="text-center p-6">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-2">Welcome, {name} (Admin)</h1>
      <p className="text-center text-gray-600 mb-6">Email: {email}</p>

      <div className="flex flex-col gap-4 max-w-sm mx-auto">
        <button onClick={() => router.push("/search")} className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Browse Tournaments
        </button>
        <button onClick={() => router.push("/my-registrations")} className="bg-green-600 text-white py-2 rounded hover:bg-green-700">
          My Registrations
        </button>
        <button onClick={() => router.push("/tournament-map")} className="bg-purple-600 text-white py-2 rounded hover:bg-purple-700">
          View Tournament Map
        </button>
        <button onClick={() => router.push("/admin/manage-tournaments")} className="bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600">
          Manage Tournaments
        </button>
        <button onClick={() => router.push("/admin/add-tournament")} className="bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">
          Add Tournament
        </button>
        <button onClick={handleLogout} className="bg-red-600 text-white py-2 rounded hover:bg-red-700">
          Logout
        </button>
      </div>
    </div>
  );
}
