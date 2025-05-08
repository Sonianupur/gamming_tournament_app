"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import Layout from "@/components/Layout";
import AdminDashboard from "@/components/AdminDashboard";

export default function AdminDashboardPage() {
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

  if (loading) return <p className="text-center p-6">Loading...</p>;

  return (
    <Layout>
      <AdminDashboard
        name={name}
        email={email}
        onNavigate={router.push}
      />
    </Layout>
  );
}
