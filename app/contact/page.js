// app/contact/page.js
"use client";

import Layout from "@/components/Layout";

export default function ContactPage() {
  return (
    <Layout>
      <div className="min-h-[60vh] px-6 py-12 text-white text-center">
        <h1 className="text-3xl font-bold mb-6">📞 Contact Us</h1>

        <div className="bg-black bg-opacity-50 p-6 rounded-lg shadow-lg w-full max-w-2xl mx-auto space-y-6">
          <div className="space-y-2 text-sm text-gray-200 italic">
            <p>🏠 123 Gaming Lane, Pixelville, GX 4040</p>
            <p>📞 +44 20 7946 0998</p>
            <p>✉️ support@tournamenthub.gg</p>
          </div>

          <form className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-600"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                type="email"
                className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-600"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Message</label>
              <textarea
                rows={4}
                className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-600"
                placeholder="Type your message here..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white text-sm transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
