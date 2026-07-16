import { Event } from '@/features/events/types'
import React, { Dispatch, SetStateAction } from 'react'
import EventCard from './event-card'

interface props {
    events: Event[];
    eventSelectedId: string | undefined;
    setEventSelected : Dispatch<SetStateAction<Event | undefined>>;
    isAdmin: boolean;
}

export default function EventList({events, eventSelectedId, setEventSelected, isAdmin}: props) {
  if (events.length === 0) {
    return (
      <div className="flex-1 max-w-3xl mx-auto flex items-center justify-center py-24">
        <p className="text-muted-foreground">Aucun événement trouvé.</p>
      </div>
    )
  }

  return (
    <div className="flex-1 p4 space-y-4 max-w-3xl mx-auto">
        {events.map(event => (
          <EventCard key={event.id} event={event} eventSelectedId={eventSelectedId} setEventSelected={setEventSelected} isAdmin={isAdmin}/>
        ))}
    </div>
  )
}
