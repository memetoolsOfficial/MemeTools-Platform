/**
 * Pure, presentation-focused formatting helpers used across dashboard,
 * leaderboard-preview, and activity-feed components. No business logic,
 * no data fetching — formatting only.
 */

/** Formats a raw number as a compact volume string, e.g. 3210000 -> "$3.21M". */
export function formatVolume(value: number): string {
  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(2)}M`;
  }
  if (value >= 1_000) {
    return `$${(value / 1_000).toFixed(0)}K`;
  }
  return `$${value}`;
}

/** Formats a raw number as a compact count string, e.g. 12400 -> "12.4K". */
export function formatCount(value: number): string {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}M`;
  }
  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(1)}K`;
  }
  return `${value}`;
}

/** Formats a 0–100 number as a percentage label, e.g. 68 -> "68%". */
export function formatPercentage(value: number): string {
  return `${Math.round(value)}%`;
}

/** Formats a 0–100 number as a price-in-cents label, e.g. 68 -> "68¢". */
export function formatCents(value: number): string {
  return `${Math.round(value)}¢`;
}
