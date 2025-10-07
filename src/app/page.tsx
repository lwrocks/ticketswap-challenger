"use client";

import { Book, ListTodo } from "lucide-react";
import { Logo } from "./components/Logo";
import { PopularEvents } from "./components/PopularEvents";
import { SearchEvents } from "./components/SearchEvents";
import { useState } from "react";
import { formatDate } from "@/utils/formatDate";
import Link from "next/link";

export default function Home() {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleResults = (events: any[]) => {
    setSearchResults(events);
    setHasSearched(true);
  };

  return (
    <main className="max-w-3xl mx-auto p-4 my-4 grid gap-5">
      <div className="grid gap-3">
        <Logo />
      </div>
      <SearchEvents onResults={handleResults} />
      {hasSearched ? (
        <div>
          <h2 className="text-lg font-bold mb-2">Search Results</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
            {searchResults.length === 0 ? (
              <p>No events found.</p>
            ) : (
              searchResults.map((event: any) => (
                <Link key={event.id} href={`/events/${event.id}`}>
                  <div className="relative aspect-video rounded-lg overflow-hidden cursor-pointer">
                    <div className="absolute inset-x-0 bottom-0 p-2">
                      <h1 className="text-sm text-primary-foreground">
                        {event.name}
                      </h1>
                      <p className="text-xs text-secondary-foreground">
                        {event.locationId} - {formatDate(event.date)}
                      </p>
                    </div>
                    <img
                      className="object-cover h-full w-full"
                      src={event.imageUrl}
                      alt={event.name}
                    />
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      ) : (
        <PopularEvents />
      )}
    </main>
  );
}
