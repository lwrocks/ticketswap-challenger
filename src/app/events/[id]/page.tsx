import Link from "next/link";
import { locations, getEvents } from "@/lib/mock-data";
import { formatDate } from "@/utils/formatDate";

export default async function EventPage({
  params,
}: {
  params: { id: string };
}) {
  const events = await getEvents();
  const event = events.find((e) => String(e.id) === params.id);
  const location = locations.find(
    (loc) => String(loc.id) === String(event?.locationId)
  );

  if (!event) {
    return <div>Event not found.</div>;
  }

  return (
    <main className="max-w-2xl mx-auto p-8">
      <Link
        href="/"
        className="text-blue-600 hover:underline mb-4 inline-block"
      >
        &larr; Back
      </Link>
      <h1 className="text-2xl font-bold mb-4">{event.name}</h1>
      <img
        src={event.imageUrl}
        alt={event.name}
        className="rounded-lg mb-4 w-full object-cover"
        style={{ maxHeight: 400 }}
      />
      <div className="mb-2">
        <strong>Date:</strong> {formatDate(event.date)}
      </div>
      <div className="mb-2">
        <strong>Location:</strong> {location ? location.name : event.locationId}
      </div>
      <div className="mb-2">
        <strong>Alerts:</strong> {event.alerts}
      </div>
      <div className="mb2">
        <strong>Description:</strong> {event.description}
      </div>
    </main>
  );
}
