import { Check, Radar, Trash, X } from "lucide-react";
import { useState } from "react";
import { useCheckIns } from "../hooks/useCheckIns";
import { useGeolocation } from "../hooks/useGeolocation";
import type { CheckIn } from "../types/CheckIn";

export default function CheckIns() {
  const { getCurrentLocation } = useGeolocation();
  const { checkIns, addCheckIn, deleteCheckIn } = useCheckIns();

  const [note, setNote] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleCheckIn = async () => {
    setIsLoading(true);
    getCurrentLocation();

    setTimeout(() => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const newCheckIn: CheckIn = {
            id: crypto.randomUUID(), // Generate a unique ID for the check-in
            timestamp: Date.now(), // Include current timestamp in the check-in data
            latitude: pos.coords.latitude, // Include latitude in the check-in data
            longitude: pos.coords.longitude, // Include longitude in the check-in data
            accuracy: pos.coords.accuracy, // Include accuracy in the check-in data
            note: note.trim() || undefined, // Only include note if it's not empty
          };
          setNote(""); // clear input after check-in

          addCheckIn(newCheckIn);
          setIsLoading(false);
          setSuccess(true);
          setTimeout(() => setSuccess(false), 2000);
        },
        () => {
          setIsLoading(false);
          setError(true);
          setTimeout(() => setError(false), 2000);
        },
      );
    }, 500);
  };

  return (
    <div className="p-6 text-white relative">
      <h1 className="text-2xl font-semibold mb-4">Check-Ins</h1>

      {/* // Check-in button with loading, success, and error states */}
      <button
        onClick={handleCheckIn}
        disabled={isLoading}
        className={`px-4 py-2 rounded mb-6 flex items-center gap-2 transition-all ${
          isLoading
            ? "bg-cyan-700 opacity-70"
            : success
              ? "bg-green-600"
              : error
                ? "bg-red-600"
                : "bg-cyan-500"
        }`}
      >
        {isLoading ? (
          <Radar className="animate-spin-slow" size={20} />
        ) : success ? (
          <Check size={20} />
        ) : error ? (
          <X size={20} />
        ) : (
          <Radar size={20} />
        )}

        {isLoading
          ? "Sending..."
          : success
            ? "Sent!"
            : error
              ? "Not Checked-in"
              : "Send Check-In"}
      </button>

      {/* // Note input field */}
      <input
        type="text"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Add a note (optional)"
        className="w-full mb-4 px-3 py-2 rounded bg-gray-700 text-white placeholder-gray-400"
        maxLength={120}
      />

      <h2 className="text-xl mb-2">Recent Check-Ins</h2>

      <ul className="space-y-4">
        {checkIns.map((c) => (
          <li
            key={c.id}
            className="bg-gray-800 p-4 rounded flex justify-between items-start"
          >
            <div>
              <p>
                📍 {c.latitude.toFixed(5)}, {c.longitude.toFixed(5)}
              </p>
              <p>🎯 Accuracy: {c.accuracy}m</p>
              {c.note && <p>📝 {c.note}</p>}
              <p>🕒 {new Date(c.timestamp).toLocaleString()}</p>
            </div>

            {/* // Delete button */}
            <button
              onClick={() => deleteCheckIn(c.id)}
              className="text-red-400 hover:text-red-300 transition"
            >
              <Trash size={20} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
