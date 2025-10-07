// Updating API route to handle search and locationId query parameters.

import { getEvents } from "@/lib/mock-data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const amount = Number(searchParams.get("amount")) ?? 5;
  const offset = Number(searchParams.get("offset")) ?? 0;
  const search = searchParams.get("search")?.toLowerCase() ?? "";
  const locationId = searchParams.get("locationId");

  let events = await getEvents();

  if (search) {
    events = events.filter((event) =>
      event.name.toLowerCase().includes(search)
    );
  }

  if (locationId) {
    events = events.filter((event) => String(event.locationId) === locationId);
  }

  events = events
    .sort((a, b) => b.alerts - a.alerts)
    .slice(offset, amount + offset);

  return Response.json({ events });
}
