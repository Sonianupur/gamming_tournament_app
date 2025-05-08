export default function HeroSection() {
    return (
      <div
        className="h-[60vh] bg-cover bg-center flex items-center justify-center text-white text-center"
        style={{ backgroundImage: "url('/images/background.jpg')" }}
      >
        <div className="bg-black bg-opacity-50 p-6 rounded-xl shadow-lg">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to Tournament Hub</h1>
          
          <p className="text-lg md:text-xl mb-6">Find, join, and manage the hottest gaming tournaments!</p>
          <a
            href="/search"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
          >
            Explore Tournaments
          </a>
        </div>
      </div>
    );
  }
  