"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center p-6">
      <h1 className="text-4xl font-bold mb-4">🎮 Welcome to Gaming Tournament Hub</h1>
      <p className="text-lg text-gray-600 mb-6">
        Join exciting gaming tournaments and track your registrations!
      </p>

      <div className="flex flex-col gap-4 w-full max-w-sm">
        <Link href="/login">
          <button className="bg-blue-600 text-white text-xl py-3 rounded hover:bg-blue-700 w-full">
            Login
          </button>
        </Link>
        <Link href="/signup">
          <button className="bg-green-600 text-white text-xl py-3 rounded hover:bg-green-700 w-full">
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
}
