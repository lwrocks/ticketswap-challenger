"use client";

import { Calendar, Loader, AArrowUp } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { formatDate } from "@/utils/formatDate";

export function PopularEvents() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopularEvents = async () => {
      const data = await fetch("/api/events/popular?amount=6").then(
        (response) => response.json()
      );

      setEvents(data.events);
      setLoading(false);
    };

    fetchPopularEvents();
  }, []);

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
      <h1 className="text-xl text-black md:col-span-3 flex items-center gap-2">
        <Calendar /> Popular events
      </h1>

      {loading && (
        <div className="grid place-items-center md:col-span-3 p-10">
          <Loader className="animate-spin" />
        </div>
      )}

      {events.map((event) => (
        <Link key={event.id} href={`/events/${event.id}`}>
          <div className="relative aspect-video rounded-lg overflow-hidden">
            <div className="absolute inset-x-0 bottom-0 p-2">
              <h1 className="text-sm text-primary-foreground">{event.name}</h1>
              <p className="text-xs text-secondary-foreground">
                {formatDate(event.date)}
              </p>
            </div>

            <Image
              className="object-cover h-full w-full"
              src={event.imageUrl}
              width={320}
              height={200}
              alt="Event image"
            />
          </div>
        </Link>
      ))}
    </div>
  );
}
