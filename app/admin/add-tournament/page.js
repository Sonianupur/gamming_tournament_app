"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/firebase/firebase";
import { getDoc, doc } from "firebase/firestore";
import AddTournamentForm from "@/components/AddTournament"; // ✅ Check path

const AddTournamentPage = () => {
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        console.warn("User not logged in");
        setUserRole("guest"); // ← Added to prevent stuck state
        setLoading(false);
        return;
      }

      console.log("User UID:", user.uid);

      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const role = userDoc.data().role;
          console.log("Fetched role from Firestore:", role);
          setUserRole(role);
        } else {
          console.warn("User document not found in Firestore.");
          setUserRole("guest"); // ← Added fallback
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

  if (loading) return <p className="p-4">Loading...</p>;

  if (userRole !== "admin") {
    return <p className="text-red-600 p-4">Access denied. Admins only.</p>;
  }

  return <AddTournamentForm />;
};

export default AddTournamentPage;
