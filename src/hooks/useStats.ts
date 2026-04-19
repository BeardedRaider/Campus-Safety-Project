// -------------------------------------------------------------
// Hook: useStats
// Purpose: Dashboard stats for the logged-in user.
// Sources:
// - Check-ins (LocalStorage)
// - Tracking sessions (LocalStorage)
// - Contacts (LocalStorage)
// -------------------------------------------------------------

import { useMemo } from "react";
import { useCheckIns } from "./useCheckIns";
import { useTrackingHistory } from "./useTrackingHistory";
import { useContacts } from "./useContacts";

export function useStats() {
  // -------------------------------------------------------------
  // Load user-specific data
  // -------------------------------------------------------------
  const { checkIns } = useCheckIns();
  const { sessions } = useTrackingHistory();
  const { contacts } = useContacts();

  // -------------------------------------------------------------
  // 1. Check-ins Today
  // -------------------------------------------------------------
  const checkInsToday = useMemo(() => {
    const today = new Date().toDateString();
    return checkIns.filter((c) => {
      const d = new Date(c.timestamp).toDateString();
      return d === today;
    }).length;
  }, [checkIns]);

  // -------------------------------------------------------------
  // 2. Total Tracking Time (sum of all completed sessions)
  // -------------------------------------------------------------
const totalTrackingMs = useMemo(() => {
  let total = 0;

  sessions.forEach((s) => {
    if (s.startedAt && s.endedAt) {
      total += s.endedAt - s.startedAt;
    }
  });

  return total;
}, [sessions]);

  // -------------------------------------------------------------
  // 3. Emergency Contacts Count
  // -------------------------------------------------------------
  const contactCount = contacts.length;

return {
  checkInsToday,
  totalTrackingMs,
  contactCount,
};
}
