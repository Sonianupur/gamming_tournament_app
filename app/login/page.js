"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import Layout from "@/components/Layout"; // ✅ Import shared layout

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Get the user's role from Firestore
      const docRef = doc(db, "users", user.uid);
      const snap = await getDoc(docRef);

      if (snap.exists()) {
        const data = snap.data();
        const role = data?.role;

        // Redirect based on role
        if (role === "admin") {
          router.push("/admin-dashboard");
        } else if (role === "user") {
          router.push("/user-dashboard");
        } else {
          setError("Invalid role. Contact admin.");
        }
      } else {
        setError("User record not found.");
      }
    } catch (err) {
      console.error("Login failed:", err);
      setError("Invalid email or password.");
    }
  };

  return (
    <Layout>
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
        <form
          onSubmit={handleLogin}
          className="bg-black bg-opacity-60 text-white p-6 rounded-lg shadow-md w-full max-w-sm space-y-4"
        >
          <h2 className="text-2xl font-bold text-center">Login</h2>
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded text-white transition"
          >
            Login
          </button>

          <p className="text-sm text-center italic text-gray-300">
            Don't have an account?{" "}
            <a href="/signup" className="text-green-400 underline">
              Sign up
            </a>
          </p>
        </form>
      </div>
    </Layout>
  );
}
