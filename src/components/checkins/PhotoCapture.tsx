// -------------------------------------------------------------
// Component: PhotoCapture with compression
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
  // Compress image using canvas
  // -------------------------------------------------------------
  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = (e) => {
        img.src = e.target?.result as string;
      };

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 300; // target width
        const scale = MAX_WIDTH / img.width;

        canvas.width = MAX_WIDTH;
        canvas.height = img.height * scale;

        const ctx = canvas.getContext("2d");
        if (!ctx) return resolve("");

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Convert to JPEG @ quality 0.6
        const compressedBase64 = canvas.toDataURL("image/jpeg", 0.6);
        resolve(compressedBase64);
      };

      reader.readAsDataURL(file);
    });
  };

  // -------------------------------------------------------------
  // Handle file input → compress → return base64
  // -------------------------------------------------------------
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const compressed = await compressImage(file);
    onPhotoCaptured(compressed);
  };

  return (
    <div className="w-full flex flex-col items-center gap-4">
      {!photo && (
        <label className="w-full">
          <div className="w-full bg-cyan-600 hover:bg-cyan-500 text-black py-3 rounded-lg flex items-center justify-center gap-2 cursor-pointer transition">
            <Camera size={20} />
            <span>Take Photo</span>
          </div>

          <input
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      )}

      {photo && (
        <div className="w-full flex flex-col items-center gap-3">
          <img
            src={photo}
            alt="Captured"
            className="w-full max-h-48 object-cover rounded-lg border border-cyan-500 shadow-lg"
          />

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