// -------------------------------------------------------------
// Component: NewCheckInModal
// Purpose: Modal for creating a new check-in with animated button.
//
// Notes:
// - Uses global AnimatedButton for consistent UX
// - Modal stays open during loading (no blank modal)
// - Closes only after success
// -------------------------------------------------------------

import { X } from "lucide-react";
import { useState } from "react";
import CameraCapture from "./CameraCapture";
import AnimatedButton from "../ui/AnimatedButton";

interface NewCheckInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { note: string; photo: string | null }) => Promise<boolean>;
}

export default function NewCheckInModal({
  isOpen,
  onClose,
  onSubmit,
}: NewCheckInModalProps) {
  const [note, setNote] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);

  // Animated button states
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  // -------------------------------------------------------------
  // Handle form submission with animation
  // -------------------------------------------------------------
  const handleSubmit = async () => {
    setIsLoading(true);

    const ok = await onSubmit({ note: note.trim(), photo });

    if (ok) {
      setIsLoading(false);
      setSuccess(true);

      // Close modal after animation
      setTimeout(() => {
        setSuccess(false);
        setNote("");
        setPhoto(null);
        onClose();
      }, 1200);
    } else {
      setIsLoading(false);
      setError(true);
      setTimeout(() => setError(false), 1500);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-gray-900 text-white rounded-lg p-6 w-full max-w-lg border border-cyan-500 shadow-xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white transition"
        >
          <X size={22} />
        </button>

        <h2 className="text-xl font-semibold mb-4">New Check-In</h2>

        {/* Note Input */}
        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Add a note (optional)"
          className="w-full mb-4 px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-500 border border-gray-700 focus:border-cyan-500 focus:outline-none transition"
          maxLength={120}
        />

        {/* Camera */}
        <CameraCapture
          photo={photo}
          onPhotoCaptured={(base64) => setPhoto(base64)}
          onClearPhoto={() => setPhoto(null)}
        />

        {/* Animated Send Button */}
        <div className="mt-6">
          <AnimatedButton
            onClick={handleSubmit}
            isLoading={isLoading}
            success={success}
            error={error}
            idleText="Send Check-In"
            loadingText="Sending..."
            successText="Sent!"
            errorText="Failed"
          />
        </div>
      </div>
    </div>
  );
}
