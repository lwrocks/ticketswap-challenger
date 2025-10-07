"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { formatDate } from "@/utils/formatDate";
import { Star, Calendar, MapPin } from "lucide-react";
import { locations } from "@/lib/mock-data";

export function PopularEvents() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopularEvents = async () => {
      const response = await fetch("/api/events/popular?amount=10");
      const data = await response.json();
      setEvents(data.events);
      setLoading(false);
    };
    fetchPopularEvents();
  }, []);

  return (
    <div>
      <h1 className="text-2xl text-black flex items-center gap-2 mb-6">
        <Star className="text-yellow-500" /> The hottest events in your area
      </h1>

      {loading && (
        <div className="grid place-items-center p-10">Loading...</div>
      )}

      <div className="flex flex-col gap-6">
        {events.map((event) => {
          const location = locations.find(
            (loc) => String(loc.id) === String(event.locationId)
          );
          return (
            <div
              key={event.id}
              className="flex flex-col sm:flex-row bg-white rounded-lg shadow-md p-4 sm:p-6 w-full max-w-3xl mx-auto min-h-[180px]"
            >
              <div className="flex flex-col justify-between flex-1 sm:pr-6 h-full">
                <div>
                  <h2 className="text-xl font-bold mb-2">{event.name}</h2>
                  <div className="flex flex-col gap-1 mb-3">
                    <p className="text-gray-700 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {formatDate(event.date)}
                    </p>
                    <p className="text-gray-500 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Venue: {location ? location.name : event.locationId}
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
              <div className="flex-shrink-0 w-full sm:w-auto mt-4 sm:mt-0 flex justify-center items-center">
                <Image
                  src={event.imageUrl}
                  alt={`Poster for ${event.name}`}
                  width={220}
                  height={140}
                  className="rounded-lg object-cover w-full max-w-[160px] sm:w-[220px] sm:max-w-none h-auto"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
