// -------------------------------------------------------------
// Page: TrackingHistory
// Purpose: Display list of all past tracking sessions.
//
// Clean version:
// - Loads sessions + point counts
// - Delegates rendering + deletion to TrackingHistoryList
// - No inline card markup
// - No delete modal here
// -------------------------------------------------------------

import { useEffect, useState } from "react";
import PageContainer from "../components/PageContainer";
import { useTrackingHistory } from "../hooks/useTrackingHistory";
import { useAuth } from "../context/AuthProvider";
import TrackingHistoryList from "../components/tracking/TrackingHistoryList";

export default function TrackingHistory() {
  const { getSessions, getPointCounts } = useTrackingHistory();
  const { user } = useAuth();

  const [sessions, setSessions] = useState(getSessions());
  const [pointCounts, setPointCounts] = useState(getPointCounts());

  // Refresh when user changes
  useEffect(() => {
    setSessions(getSessions());
    setPointCounts(getPointCounts());
  }, [user]);

  return (
    <PageContainer>
      <h1 className="text-2xl font-bold text-white mb-6">Tracking History</h1>

      <TrackingHistoryList sessions={sessions} pointCounts={pointCounts} />
    </PageContainer>
  );
}
