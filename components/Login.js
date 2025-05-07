"use client";
import React, { useState } from "react";
import { loginUser } from "../firebase/firebaseAuth";
import { auth, db } from "../firebase/firebase";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const loggedInUser = await loginUser(email, password);
      // Get role from Firestore
      const userDocRef = doc(db, "users", loggedInUser.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        setUser({ ...loggedInUser, role: userData.role });
        setError("");
      } else {
        setError("User role not found in Firestore.");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (err) {
      console.error("Error logging out:", err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      {!user ? (
        <div>
          <h1 className="text-2xl font-bold mb-4">Login</h1>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 rounded"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-2 rounded"
              required
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Login
            </button>
          </form>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
      ) : (
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Welcome, {user.email}</h1>
          <p className="mb-2">
            <span className="font-semibold">Role:</span>{" "}
            {user.role === "admin" ? (
              <span className="text-green-600">Admin</span>
            ) : (
              <span className="text-blue-600">User</span>
            )}
          </p>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;
