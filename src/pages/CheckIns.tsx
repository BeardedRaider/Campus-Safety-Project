import { useGeolocation } from "../hooks/useGeolocation";
import { useCheckIns } from "../hooks/useCheckIns";
import type { CheckIn } from "../types/CheckIn";
import { useState } from "react";
import { Radar, Check } from "lucide-react";

export default function CheckIns() {
  const { position, getCurrentLocation } = useGeolocation();
  const { checkIns, addCheckIn } = useCheckIns();

  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleCheckIn = async () => {
    setIsLoading(true);
    getCurrentLocation();

    // Wait a moment for geolocation to update
    setTimeout(() => {
      if (!position) {
        setIsLoading(false);
        return;
      }

      const newCheckIn: CheckIn = {
        id: crypto.randomUUID(),
        timestamp: Date.now(),
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy,
      };

      addCheckIn(newCheckIn);
      setIsLoading(false);
      setSuccess(true);

      // Reset success state after 2 seconds
      setTimeout(() => setSuccess(false), 2000);
    }, 600);
  };

  return (
    <div className="p-6 text-white relative">
      <h1 className="text-2xl font-semibold mb-4">Check-Ins</h1>

      <button
        onClick={handleCheckIn}
        disabled={isLoading}
        className={`px-4 py-2 rounded mb-6 flex items-center gap-2 transition-all ${
          isLoading
            ? "bg-cyan-700 opacity-70"
            : success
              ? "bg-green-600"
              : "bg-cyan-500"
        }`}
      >
        {isLoading ? (
          <Radar className="animate-spin-slow" size={20} />
        ) : success ? (
          <Check size={20} />
        ) : (
          <Radar size={20} />
        )}

        {isLoading ? "Sending..." : success ? "Sent!" : "Send Check-In"}
      </button>

      <h2 className="text-xl mb-2">Recent Check-Ins</h2>

      <ul className="space-y-4">
        {checkIns.map((c) => (
          <li key={c.id} className="bg-gray-800 p-4 rounded">
            <p>
              📍 {c.latitude.toFixed(5)}, {c.longitude.toFixed(5)}
            </p>
            <p>🎯 Accuracy: {c.accuracy}m</p>
            <p>🕒 {new Date(c.timestamp).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
