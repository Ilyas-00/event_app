export const categoryColors: Record<string, string> = {
  GConf:      "violet",
  SSI:        "fuchsia",
  Cyber:      "red",
  Data:       "emerald",
  HSE:        "amber",
  Ingenierie: "orange",
};

const THEME_COLORS: Record<string, string> = {
  "Cybersécurité": "red",
  "Ingénierie":    "orange",
}

export function colorFromThemeId(themeName: string | undefined): string {
  if (!themeName) return "violet"
  return THEME_COLORS[themeName] ?? "violet"
}

export function formatEventSchedule(
  eventDate: string,
  durationMinutes: number,
  { withWeekday = false }: { withWeekday?: boolean } = {}
) {
  const start = new Date(eventDate).getTime()
  const dateFormatted = new Date(start).toLocaleDateString('fr-FR', {
    ...(withWeekday && { weekday: 'long' }),
    day: 'numeric', month: 'long', year: 'numeric',
  })
  const startTimeFormatted = new Date(start)
    .toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    .replace(':', 'h')
  const endTimeFormatted = new Date(start + durationMinutes * 60_000)
    .toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    .replace(':', 'h')
  return { dateFormatted, startTimeFormatted, endTimeFormatted }
}
