"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Fix Leaflet icon path in Next.js
L.Icon.Default.mergeOptions({
  iconRetinaUrl: typeof markerIcon2x === "string" ? markerIcon2x : markerIcon2x.src,
  iconUrl: typeof markerIcon === "string" ? markerIcon : markerIcon.src,
  shadowUrl: typeof markerShadow === "string" ? markerShadow : markerShadow.src,
});

export default function TournamentMap({ tournaments }) {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
    }

    const map = L.map(mapContainerRef.current).setView([51.505, -0.09], 5);
    mapRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    const bounds = [];

    tournaments.forEach((t) => {
      const lat = parseFloat(t.latitude);
      const lng = parseFloat(t.longitude);

      if (!isNaN(lat) && !isNaN(lng)) {
        const isUpcoming = new Date(t.date) > new Date();

        const popupHtml = `
          <div>
            <strong>${t.title}</strong><br/>
            ${t.date}<br/>
            ${t.location}<br/>
            ${
              isUpcoming
                ? `<a href="/register/${t.id}" class="inline-block mt-2 px-3 py-1 rounded text-white bg-blue-600 hover:bg-blue-700 text-sm text-center" style="text-decoration:none;">Register</a>`
                : `<p class="mt-2 text-sm text-red-400 italic">Registration closed</p>`
            }
          </div>
        `;

        const marker = L.marker([lat, lng]).addTo(map);
        marker.bindPopup(popupHtml);
        bounds.push([lat, lng]);
      }
    });

    if (bounds.length > 0) {
      map.fitBounds(bounds, { padding: [30, 30] });
    }
  }, [tournaments]);

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Sidebar */}
      <div className="md:w-1/3 bg-black bg-opacity-60 p-4 text-white rounded shadow h-[600px] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Tournament List</h2>
        <ul className="space-y-3 text-sm">
          {tournaments.map((t) => (
            <li key={t.id} className="border-b border-gray-700 pb-2">
              <p className="font-medium">{t.title}</p>
              <p>{t.location}</p>
              <p className="italic text-gray-400 text-xs">{t.date}</p>
              <a
                href={`/register/${t.id}`}
                className="inline-block mt-2 px-3 py-1 rounded text-white bg-blue-600 hover:bg-blue-700 text-xs"
              >
                Register
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Map */}
      <div className="relative md:w-2/3 h-[600px] rounded overflow-hidden">
        <div ref={mapContainerRef} className="w-full h-full rounded border" />

        {/* Map Legend */}
        <div className="absolute bottom-4 right-4 bg-white text-black text-xs p-2 rounded shadow">
          <p><strong>📍</strong> Tournament Location</p>
        </div>
      </div>
    </div>
  );
}
