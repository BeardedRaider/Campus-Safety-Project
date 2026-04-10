// -------------------------------------------------------------
// Component: PhotoCapture
// Purpose: Handle camera input + preview + retake.
//
// Props:
// - photo: string | null  → current base64 image (if any)
// - onPhotoCaptured: (base64: string) => void
// - onClearPhoto: () => void  → clears the current photo
//
// Notes:
// - Uses <input type="file" capture="environment"> for
//   mobile compatibility (iOS + Android).
// - Converts the captured file to base64 for storage.
// - Shows a large preview when a photo is captured.
// -------------------------------------------------------------

import { Camera, RefreshCcw } from "lucide-react";

interface PhotoCaptureProps {
  photo: string | null;
  onPhotoCaptured: (base64: string) => void;
  onClearPhoto: () => void;
}

export default function PhotoCapture({
  photo,
  onPhotoCaptured,
  onClearPhoto,
}: PhotoCaptureProps) {
  // -------------------------------------------------------------
  // Convert selected file → base64 string
  // -------------------------------------------------------------
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      onPhotoCaptured(base64);
    };
    reader.readAsDataURL(file);
  };

  // -------------------------------------------------------------
  // Render
  // -------------------------------------------------------------
  return (
    <div className="w-full flex flex-col items-center gap-4">
      {/* If no photo yet → show Take Photo button */}
      {!photo && (
        <label className="w-full">
          <div className="w-full bg-cyan-600 hover:bg-cyan-500 text-black py-3 rounded-lg flex items-center justify-center gap-2 cursor-pointer transition">
            <Camera size={20} />
            <span>Take Photo</span>
          </div>

          {/* Hidden file input */}
          <input
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      )}

      {/* If photo exists → show preview + retake */}
      {photo && (
        <div className="w-full flex flex-col items-center gap-3">
          {/* Large preview */}
          <img
            src={photo}
            alt="Captured"
            className="w-full max-h-48 object-cover rounded-lg border border-cyan-500 shadow-lg"
          />

          {/* Retake button */}
          <button
            onClick={onClearPhoto}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg flex items-center gap-2 transition"
          >
            <RefreshCcw size={18} />
            Retake Photo
          </button>
        </div>
      )}
    </div>
  );
}
