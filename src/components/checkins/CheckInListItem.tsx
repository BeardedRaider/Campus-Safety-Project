// -------------------------------------------------------------
// Component: CheckInListItem
// Purpose: Render a single check-in entry with optional photo.
//
// Layout:
// [ thumbnail ]  [ location, accuracy, note, timestamp, delete ]
//
// Props:
// - checkIn: CheckIn
// - onDelete: (id: string) => void
//
// Notes:
// - Thumbnail is shown only if `photo` exists.
// - Thumbnail is a rounded rectangle (8px) with neon border.
// -------------------------------------------------------------

import { MapPin, Target, StickyNote, Clock, Trash2 } from "lucide-react";
import type { CheckIn } from "../../types/CheckIn";

interface CheckInListItemProps {
  checkIn: CheckIn;
  onDelete: (id: string) => void;
}

export default function CheckInListItem({
  checkIn,
  onDelete,
}: CheckInListItemProps) {
  const { id, latitude, longitude, accuracy, note, timestamp, photo } = checkIn;

  return (
    <li className="bg-gray-800 p-4 rounded-lg shadow-sm flex items-start gap-4 border border-gray-700">
      {/* Thumbnail (left) */}
      {photo && (
        <div className="w-20 h-20 rounded-lg overflow-hidden border border-cyan-500 shrink-0">
          <img
            src={photo}
            alt="Check-in"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 space-y-1">
        <p className="flex items-center gap-2 text-gray-300">
          <MapPin size={18} className="text-cyan-400" />
          {latitude.toFixed(5)}, {longitude.toFixed(5)}
        </p>

        <p className="flex items-center gap-2 text-gray-300">
          <Target size={18} className="text-purple-400" />
          Accuracy: {accuracy}m
        </p>

        {note && (
          <p className="flex items-center gap-2 text-gray-300">
            <StickyNote size={18} className="text-yellow-400" />
            {note}
          </p>
        )}

        <p className="flex items-center gap-2 text-gray-400 text-sm">
          <Clock size={16} />
          {new Date(timestamp).toLocaleString()}
        </p>
      </div>

      {/* Delete button */}
      <button
        onClick={() => onDelete(id)}
        className="text-red-400 hover:text-red-300 transition shrink-0"
      >
        <Trash2 size={20} />
      </button>
    </li>
  );
}
