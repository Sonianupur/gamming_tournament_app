"use client";

export default function AdminDashboard({ name, email, onNavigate }) {
  return (
    <div className="min-h-screen p-6 text-white">
      <h1 className="text-3xl font-bold text-center mb-2">Welcome, {name} (Admin)</h1>
      <p className="text-center text-gray-300 mb-6">Email: {email}</p>

      <div className="flex flex-col gap-4 max-w-sm mx-auto">
        <button
          onClick={() => onNavigate("/search")}
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Browse Tournaments
        </button>
        <button
          onClick={() => onNavigate("/my-registrations")}
          className="bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          My Registrations
        </button>
        <button
          onClick={() => onNavigate("/tournament-map")}
          className="bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
        >
          View Tournament Map
        </button>
        <button
          onClick={() => onNavigate("/admin/manage-tournaments")}
          className="bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600"
        >
          Manage Tournaments
        </button>
        <button
          onClick={() => onNavigate("/admin/add-tournament")}
          className="bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
        >
          Add Tournament
        </button>
      </div>
    </div>
  );
}
