export type CATEGORY = 'GConf' | 'SSI' | 'Cyber' | 'Data' | 'HSE' | 'Ingenierie'

export const CATEGORY_LIST: CATEGORY[] = ['GConf', 'SSI', 'Cyber', 'Data', 'HSE', 'Ingenierie']

export const categoryColors: Record<string, string> = {
  GConf:      "violet",
  SSI:        "fuchsia",
  Cyber:      "red",
  Data:       "emerald",
  HSE:        "amber",
  Ingenierie: "orange",
};

export type Event = {
  id: string;
  title: string;
  summary: string;
  description: string | null;
  contactTgi: string;
  contactEmail: string;
  location: string;
  eventDate: string;
  durationMinutes: number;
  serviceId: string;
  themeName: string;
  capacity: number;
  remainingSeats: number;
  isRegistered: boolean;
  createdBy: string;
  createdAt: string;
};

export type Registration = {
  id: string;
  event_id: string;
  user_id: string;
  registered_at: string;
};

export type CreateEventInput = {
  title: string;
  summary: string;
  description: string;
  contactTgi: string;
  contactEmail: string;
  location: string;
  eventDate: string;
  durationMinutes: number;
  themeId: string;
  capacity: number;
};