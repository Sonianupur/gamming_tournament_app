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

const TournamentMap = ({ tournaments }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Remove previous map if it exists
    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
    }

    const map = L.map(mapContainerRef.current).setView([51.505, -0.09], 6);
    mapRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    const bounds = [];

    tournaments.forEach((t) => {
      const lat = parseFloat(t.latitude);
      const lng = parseFloat(t.longitude);

      if (!isNaN(lat) && !isNaN(lng)) {
        const marker = L.marker([lat, lng]).addTo(map);
        marker.bindPopup(createPopupContent(t));
        bounds.push([lat, lng]);
      }
    });

    if (bounds.length > 0) {
      map.fitBounds(bounds, { padding: [50, 50] });
    }

  }, [tournaments]);

  const createPopupContent = (tournament) => {
    const container = document.createElement("div");
    container.innerHTML = `
      <strong>${tournament.title}</strong><br/>
      ${tournament.date}<br/>
      ${tournament.location}<br/>
    `;

    const button = document.createElement("button");
    button.innerText = "Register";
    button.className =
      "bg-blue-600 text-white mt-2 py-1 px-3 rounded hover:bg-blue-700";
    button.onclick = () => {
      window.location.href = `/register/${tournament.id}`;
    };

    container.appendChild(button);
    return container;
  };

  return <div ref={mapContainerRef} className="w-full h-[600px] rounded shadow border" />;
};

export default TournamentMap;
