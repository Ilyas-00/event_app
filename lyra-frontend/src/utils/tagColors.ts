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