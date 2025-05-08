"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/firebase/firebase";
import { getDoc, doc } from "firebase/firestore";
import AddTournamentForm from "@/components/AddTournament"; // ✅ Your form component
import Layout from "@/components/Layout"; // ✅ Add Layout wrapper

const AddTournamentPage = () => {
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        console.warn("User not logged in");
        setUserRole("guest");
        setLoading(false);
        return;
      }

      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const role = userDoc.data().role;
          setUserRole(role);
        } else {
          console.warn("User document not found in Firestore.");
          setUserRole("guest");
        }
      } catch (err) {
        console.error("Error fetching user role:", err);
        setUserRole("guest");
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Layout>
      <div className="p-6 min-h-screen text-white">
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : userRole !== "admin" ? (
          <p className="text-center text-red-400">Access denied. Admins only.</p>
        ) : (
          <AddTournamentForm />
        )}
      </div>
    </Layout>
  );
};

export default AddTournamentPage;
