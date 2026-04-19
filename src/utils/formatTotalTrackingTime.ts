// -------------------------------------------------------------
// Utility: formatTotalTrackingTime
// Purpose: Format total tracking duration for StatsGrid.
// Rules:
// - Under 1 hour → "Xm Ys"
// - 1 hour or more → "Xh Ym"
// -------------------------------------------------------------
export function formatTotalTrackingTime(totalMs: number) {
  const totalSeconds = Math.floor(totalMs / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  // Under 1 hour → show minutes + seconds
  if (hours === 0) {
    return `${minutes}m ${seconds.toString().padStart(2, "0")}s`;
  }

  // 1 hour or more → show hours + minutes (no seconds)
  return `${hours}h ${minutes.toString().padStart(2, "0")}m`;
}
