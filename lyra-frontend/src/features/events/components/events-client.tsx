'use client'

import { cn } from "@/lib/utils"
import { Event } from "@/features/events/types"
import { useState, useEffect } from "react"
import EventList from "./event-list"
import EventDetails from "./event-details"

interface Props {
  events: Event[]
  isAdmin: boolean
}

export default function EventsClient({ events, isAdmin }: Props) {
  const [eventSelected, setEventSelected] = useState<Event | undefined>(events[0])

  useEffect(() => {
    if (eventSelected) {
      const updated = events.find(e => e.id === eventSelected.id)
      if (updated) setEventSelected(updated)
    }
  }, [events])

  return (
    <div className="h-full flex">
      <div className="overflow-y-auto w-full p-4">
        <EventList
          events={events}
          eventSelectedId={eventSelected?.id}
          setEventSelected={setEventSelected}
          isAdmin={isAdmin}
        />
      </div>

      <div className={cn(
        "shrink-0 overflow-hidden transition-all duration-300 border-l ease-in-out",
        eventSelected ? "w-xl" : "w-0"
      )}>
        <EventDetails event={eventSelected} isAdmin={isAdmin} />
      </div>
    </div>
  )
}
