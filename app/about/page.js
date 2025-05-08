import Layout from "@/components/Layout";

export default function AboutPage() {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-700 text-white px-6 py-12 flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-6">🎮 About Tournament Hub</h1>

        <div className="bg-black bg-opacity-50 p-6 rounded-lg shadow-lg w-full max-w-3xl space-y-6 text-gray-200 text-sm leading-relaxed">
          <p className="italic">
            Tournament Hub is a platform built for passionate gamers who want to
            connect, compete, and climb the ranks in the world of online and
            local e-sports events.
          </p>

          <p className="italic">
            Whether you play FIFA, Call of Duty, or Super Smash Bros, our platform
            helps you discover tournaments, register with ease, track your history,
            and stay updated with real-time status — all on an interactive map.
          </p>

          <p className="italic">
            Founded in 2025, our mission is to make competitive gaming more accessible,
            organized, and fun for players of all skill levels. We believe that every match
            is a chance to grow, connect with new people, and challenge yourself.
          </p>

          <p className="italic">
            Join us and become part of a growing community where players, organizers,
            and fans come together to celebrate the spirit of gaming.
          </p>
        </div>
      </div>
    </Layout>
  );
}
