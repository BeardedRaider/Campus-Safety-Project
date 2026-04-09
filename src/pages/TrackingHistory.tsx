// -------------------------------------------------------------
// Page: TrackingHistory
// Purpose: Display a list of all tracking sessions.
//
// This is the page shell. It loads sessions from the history hook
// and will later render <TrackingHistoryList /> once the component
// is built.
//
// For now, it shows a placeholder so we can test routing + data.
// -------------------------------------------------------------

import PageContainer from "../components/PageContainer";
import SettingsSectionHeader from "../components/settings/SettingsSectionHeader";
import { useTrackingHistory } from "../hooks/useTrackingHistory";
import TrackingHistoryList from "../components/tracking/TrackingHistoryList";


export default function TrackingHistory() {
  const { getSessions, getPointsForSession } = useTrackingHistory();

  // Load all sessions (sorted newest → oldest)
  const sessions = getSessions();

  // Build a point count map for the list component
  const pointCounts = Object.fromEntries(
    sessions.map((s) => [s.id, getPointsForSession(s.id).length]),
  );

  return (
    <PageContainer>
      <h1 className="text-2xl font-bold text-white mb-6">Tracking History</h1>

      <SettingsSectionHeader title="Past Tracking Sessions" />

      <TrackingHistoryList sessions={sessions} pointCounts={pointCounts} />
    </PageContainer>
  );
}
