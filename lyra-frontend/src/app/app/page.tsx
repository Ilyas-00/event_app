import { getEvents } from "@/features/events/services/event-service"
import { isAdmin } from "@/lib/services/me-service"
import EventsClient from "@/features/events/components/events-client"

export default async function AppPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; date?: string; theme?: string }>
}) {
  const { search, date, theme } = await searchParams
  const [events, admin] = await Promise.all([getEvents(search, date, theme), isAdmin()])
  return <EventsClient events={events} isAdmin={admin} />
}
