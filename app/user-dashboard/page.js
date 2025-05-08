"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import Layout from "@/components/Layout"; // ✅ Import Layout

export default function UserDashboard() {
  const [name, setName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserInfo = async () => {
      const user = auth.currentUser;
      if (!user) {
        router.push("/login");
        return;
      }

      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setName(data.name || "User");
          setUserEmail(user.email);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }

      setLoading(false);
    };

    fetchUserInfo();
  }, [router]);

  const handleLogout = async () => {
    await auth.signOut();
    router.push("/login");
  };

  if (loading)
    return (
      <Layout>
        <p className="p-6 text-center">Loading Dashboard...</p>
      </Layout>
    );

  return (
    <Layout>
      <div className="min-h-[70vh] bg-100 p-6 text-center">
        <h1 className="text-3xl font-bold mb-2">Welcome, {name}!</h1>
        <p className="text-bg-600 mb-6">Email: {userEmail}</p>

        <div className="flex flex-col gap-4 max-w-sm mx-auto">
          <button
            onClick={() => router.push("/search")}
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Browse Tournaments
          </button>
          <button
            onClick={() => router.push("/my-registrations")}
            className="bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            My Registrations
          </button>
          <button
            onClick={() => router.push("/tournament-map")}
            className="bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
          >
            View Tournament Map
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white py-2 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>
    </Layout>
  );
}
