"use client";

import { useState, useEffect } from "react";

export function SearchEvents({
  onResults,
}: {
  onResults?: (events: any[]) => void;
}) {
  const [query, setQuery] = useState("");
  const [locationId, setLocationId] = useState("");
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLocations = async () => {
      const response = await fetch("/api/locations");
      const data = await response.json();
      setLocations(data.locations);
    };
    fetchLocations();
  }, []);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const params = new URLSearchParams();
    params.append("amount", "6");
    if (query) params.append("search", query);
    if (locationId) params.append("locationId", locationId);

    const response = await fetch(
      `/api/events/popular?amount=6&${params.toString()}`
    );
    const data = await response.json();
    setLoading(false);

    if (onResults) {
      onResults(data.events);
    }
  };

  return (
    <form className="flex gap-2 mb-4" onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Search Events"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border rounded px-2 py-1"
      />
      <select
        value={locationId}
        onChange={(e) => setLocationId(e.target.value)}
        className="border rounded px-2 py-1"
      >
        <option value="">All Locations</option>
        {locations.map((loc: any) => (
          <option key={loc.id} value={loc.id}>
            {loc.name}
          </option>
        ))}
      </select>
      <button type="submit" className="bg-primary text-white px-3 py-1 rounded">
        Search
      </button>
    </form>
  );
}
