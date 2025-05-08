"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { auth } from "@/firebase/firebase";

export default function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  // Detect auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await auth.signOut();
    router.push("/login");
  };

  return (
    <div className="relative min-h-screen text-white">
      {/* Background & overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: "url('/images/image2.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-green-900 via-blue-800 to-green-900 opacity-80 z-10" />

      {/* Page content */}
      <div className="relative z-20 flex flex-col min-h-screen">
        {/* Navbar */}
        <nav className="flex justify-between items-center p-4 px-6 bg-black/50 backdrop-blur-md sticky top-0 z-30">
          <Link href="/">
            <div className="flex items-center space-x-2 cursor-pointer">
              <img src="/icons/logo.jpg" alt="Logo" className="h-10 w-auto" />
              <span className="text-xl font-bold tracking-wide">Tournament Hub</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-6 text-sm text-gray-200">
            {user ? (
              <button
                onClick={handleLogout}
                className="bg-red-600 px-4 py-1 rounded hover:bg-red-700 transition"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                className="bg-green-600 px-4 py-1 rounded hover:bg-green-700 transition"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white text-xl"
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-black/90 text-white text-center py-4 z-40 space-y-4"
          >
            {user ? (
              <button onClick={handleLogout}>Logout</button>
            ) : (
              <Link href="/login" onClick={() => setMenuOpen(false)}>
                Login
              </Link>
            )}
          </motion.div>
        )}

        {/* Children */}
        <main className="flex-1">{children}</main>

        {/* Footer */}
        <footer className="mt-auto bg-black/60 text-gray-300 text-sm py-6 px-4">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="italic text-center md:text-left">
              © {new Date().getFullYear()} Tournament Hub. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="https://github.com/sonianupur" target="_blank" rel="noreferrer">
                <img src="/icons/github.png" alt="GitHub" className="h-8 w-8" />
              </a>
              <a href="https://twitter.com/sonianupur" target="_blank" rel="noreferrer">
                <img src="/icons/twitter.png" alt="Twitter" className="h-8 w-8" />
              </a>
              <a href="https://facebook.com/sonianupur" target="_blank" rel="noreferrer">
                <img src="/icons/facebook.png" alt="Facebook" className="h-8 w-8" />
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
