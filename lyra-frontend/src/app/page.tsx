'use client'

import EventDetails from "@/features/events/components/event-details";
import EventList from "@/features/events/components/event-list";
import { cn } from "@/lib/utils";
import { Event } from "@/features/events/types";
import { mockEvents } from "@/utils/mockData";
import { useState } from "react";

export default function HomePage() {
  const [eventSelected, setEventSelected] = useState<Event | undefined>(mockEvents[0])

  return (
    <div className="h-full flex">
      <div className="overflow-y-auto w-full p-4">
        <EventList events={mockEvents} eventSelectedId={eventSelected?.id} setEventSelected={setEventSelected} />
      </div>

      <div className={cn(
        "shrink-0 overflow-hidden transition-all duration-300 border-l ease-in-out",
        eventSelected ? "w-xl" : "w-0"
      )}>
        <EventDetails event={eventSelected} />
      </div>
    </div>
  );
}
