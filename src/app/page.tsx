"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { formatDate } from "@/utils/formatDate";
import { Calendar, Star, MapPin } from "lucide-react";
import { locations } from "@/lib/mock-data";
import { Logo } from "./components/Logo";
import { SearchEvents } from "./components/SearchEvents";

export default function Home() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const fetchPopularEvents = async () => {
      const response = await fetch("/api/events/popular?amount=10");
      const data = await response.json();
      setEvents(data.events);
      setLoading(false);
    };
    fetchPopularEvents();
  }, []);

  const handleResults = (results: any[]) => {
    setSearchResults(results);
    setHasSearched(true);
  };

  const handleBackHome = () => {
    setHasSearched(false);
    setSearchResults([]);
  };

  // Choose which events to display
  const displayEvents = hasSearched ? searchResults : events;

  return (
    <main className="max-w-3xl mx-auto p-4 my-8 grid gap-6">
      <div className="grid gap-3 mb-6">
        <Logo />
        <SearchEvents onResults={handleResults} />
      </div>
      {hasSearched && (
        <button
          onClick={handleBackHome}
          className="text-blue-600 hover:underline font-medium mb-4 self-start"
          type="button"
        >
          &larr; Back to all events
        </button>
      )}
      <h1 className="text-2xl text-black flex items-center gap-2 mb-6">
        <Star className="text-yellow-500" />{" "}
        {hasSearched ? "Search Results" : "The hottest events in your area"}
      </h1>

      {loading && !hasSearched && (
        <div className="grid place-items-center p-10">Loading...</div>
      )}

      <div className="flex flex-col gap-6">
        {displayEvents.length === 0 ? (
          <p className="text-gray-500">No events found.</p>
        ) : (
          displayEvents.map((event: any) => {
            const location = locations.find(
              (loc) => String(loc.id) === String(event.locationId)
            );
            return (
              <div
                key={event.id}
                className="bg-white rounded-lg shadow-md p-4 sm:p-6 w-full max-w-3xl mx-auto flex flex-col"
              >
                <div className="w-full mb-4 flex justify-center">
                  <Image
                    src={event.imageUrl}
                    alt={`Poster for ${event.name}`}
                    width={800}
                    height={320}
                    className="rounded-lg object-cover w-full max-w-2xl h-[180px] sm:h-[240px]"
                  />
                </div>
                <div className="flex flex-col justify-between flex-1">
                  <div>
                    <h2 className="text-xl font-bold mb-2">{event.name}</h2>
                    <div className="flex flex-col gap-1 mb-3">
                      <p className="text-gray-700 flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {formatDate(event.date)}
                      </p>
                      <p className="text-gray-500 flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {location ? location.name : event.locationId}
                      </p>
                    </div>
                  </div>
                  <Link
                    href={`/events/${event.id}`}
                    className="text-blue-600 hover:underline font-medium mt-2"
                  >
                    View details &rarr;
                  </Link>
                </div>
              </div>
            );
          })
        )}
      </div>
    </main>
  );
}
