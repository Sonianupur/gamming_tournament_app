"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative min-h-screen text-white">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: "url('/images/image2.jpg')" }}
      ></div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-900 via-blue-800 to-green-900 opacity-80 z-10"></div>

      {/* Page Content */}
      <div className="relative z-20 flex flex-col min-h-screen">
        {/* Navbar */}
        <nav className="flex justify-between items-center p-4 px-6 bg-black/50 backdrop-blur-md sticky top-0 z-30">
        <div className="flex items-center space-x-2">
  <img src="/icons/logo.jpg" alt="Logo" className="h-8 w-auto" />
  <span className="text-xl font-bold tracking-wide">Tournament Hub</span>
</div>

          <div className="hidden md:flex space-x-6 text-sm text-gray-200">
            <Link href="/">Home</Link>
            <Link href="/about">About Us</Link>
            <Link href="/contact">Contact Us</Link>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white text-xl"
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </nav>

        {/* Mobile Sidebar */}
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden absolute top-16 left-0 w-full bg-black/90 text-white text-center py-4 z-40 space-y-4"
          >
            <Link href="/" onClick={() => setMenuOpen(false)} className="block hover:text-green-400 transition">Home</Link>
            <Link href="/about" onClick={() => setMenuOpen(false)} className="block hover:text-green-400 transition">About Us</Link>
            <Link href="/contact" onClick={() => setMenuOpen(false)} className="block hover:text-green-400 transition">Contact</Link>
            <Link href="/search" onClick={() => setMenuOpen(false)} className="block hover:text-green-400 transition">Tournaments</Link>
            <Link href="/login" onClick={() => setMenuOpen(false)} className="block hover:text-green-400 transition">Login</Link>
          </motion.div>
        )}

        {/* Hero Section */}
        <div className="h-[50vh] flex items-center justify-center text-center px-4">
          <motion.div
            className="bg-black bg-opacity-50 p-6 rounded-xl shadow-lg max-w-xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.h1
              className="text-3xl md:text-4xl font-bold mb-2"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Welcome to Tournament Hub
            </motion.h1>
            <motion.p
              className="text-sm italic mb-4 text-gray-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              “Tournaments built for players. Powered by community.”
            </motion.p>
          </motion.div>
        </div>

        {/* Login / Signup Section */}
        <div className="flex flex-col items-center justify-center text-center p-6">
          <p className="text-sm italic text-gray-300 mb-4">
            Join exciting gaming tournaments and track your registrations!
          </p>

          <div className="flex flex-col gap-3 w-full max-w-xs">
            <Link href="/login">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="bg-purple-500 text-white text-sm py-2 rounded hover:bg-purple-600 w-1/2 mx-auto shadow-md"
              >
                Login
              </motion.button>
            </Link>
            <p className="text-xs italic text-gray-300 mb-2">
              Don&apos;t have an account? Sign up now!
            </p>
            <Link href="/signup">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="bg-green-500 text-white text-sm py-2 rounded hover:bg-green-600 w-1/2 mx-auto shadow-md"
              >
                Sign Up
              </motion.button>
            </Link>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-10 text-center px-4 pb-10">
          <h2 className="text-lg italic text-gray-200 mb-2">
            Ready to compete and climb the leaderboard?
          </h2>
          <Link href="/search">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="bg-blue-400 px-4 py-2 text-white text-sm rounded hover:bg-blue-600 shadow"
            >
              Explore Tournaments
            </motion.button>
          </Link>
        </div>

        {/* Footer */}
        <footer className="mt-auto bg-black/60 text-gray-300 text-sm py-6 px-4">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="italic text-center md:text-left">
              © {new Date().getFullYear()} Tournament Hub. All rights reserved.
            </p>

            {/* Quick Links */}
            <div className="flex space-x-4 text-center text-sm">
              <Link
                href="/"
                className="hover:text-green-400 hover:underline hover:tracking-wide transition duration-200"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="hover:text-green-400 hover:underline hover:tracking-wide transition duration-200"
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="hover:text-green-400 hover:underline hover:tracking-wide transition duration-200"
              >
                Contact
              </Link>
            </div>

            {/* Social Icons */}
            <div className="flex space-x-4">
              <motion.a
                href="https://github.com/sonianupur"
                whileHover={{ scale: 1.2 }}
                className="hover:opacity-90"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/icons/github.png" alt="GitHub" className="h-5 w-5" />
              </motion.a>
              <motion.a
                href="https://twitter.com/sonianupur"
                whileHover={{ scale: 1.2 }}
                className="hover:opacity-90"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/icons/twitter.png" alt="Twitter" className="h-5 w-5" />
              </motion.a>
              <motion.a
                href="https://facebook.com/invite/sonia farzana nupur"
                whileHover={{ scale: 1.2 }}
                className="hover:opacity-90"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/icons/facebook.png" alt="facebook" className="h-5 w-5" />
              </motion.a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
