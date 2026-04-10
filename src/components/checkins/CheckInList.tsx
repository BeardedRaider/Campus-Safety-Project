// -------------------------------------------------------------
// Component: CheckInList
// Purpose: Render a list of check-ins using CheckInListItem.
//
// Props:
// - checkIns: CheckIn[]
// - onDelete: (id: string) => void
//
// Notes:
// - Handles empty state
// - Keeps list layout consistent and modular
// -------------------------------------------------------------

import type { CheckIn } from "../../types/CheckIn";
import CheckInListItem from "./CheckInListItem";

interface CheckInListProps {
  checkIns: CheckIn[];
  onDelete: (id: string) => void;
}

export default function CheckInList({ checkIns, onDelete }: CheckInListProps) {
  if (checkIns.length === 0) {
    return (
      <p className="text-gray-400 text-center mt-6">
        No check-ins yet. Tap the + button to add one.
      </p>
    );
  }

  return (
    <ul className="space-y-4">
      {checkIns.map((c) => (
        <CheckInListItem key={c.id} checkIn={c} onDelete={onDelete} />
      ))}
    </ul>
  );
}
