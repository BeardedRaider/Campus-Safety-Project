// -------------------------------------------------------------
// Component: CameraCapture
// Purpose: Full camera control using getUserMedia().
//
// Features:
// - Live camera preview (back or front camera)
// - Round switch-camera button (bottom-center overlay)
// - Capture photo → compress → return base64
// - Retake photo
// - Permission denied fallback UI
//
// Notes:
// - Designed for mobile-first modals (max-h-64 preview)
// - Uses facingMode to switch between cameras
// -------------------------------------------------------------

import { useEffect, useRef, useState } from "react";
import { Camera, RefreshCcw, AlertTriangle, Repeat } from "lucide-react";

interface CameraCaptureProps {
  photo: string | null;
  onPhotoCaptured: (base64: string) => void;
  onClearPhoto: () => void;
}

export default function CameraCapture({
  photo,
  onPhotoCaptured,
  onClearPhoto,
}: CameraCaptureProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [stream, setStream] = useState<MediaStream | null>(null);
  const [permissionDenied, setPermissionDenied] = useState(false);

  // Track which camera is active
  const [useFrontCamera, setUseFrontCamera] = useState(false);

  // -------------------------------------------------------------
  // Start camera stream when component mounts or camera toggles
  // -------------------------------------------------------------
  useEffect(() => {
    const startCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: useFrontCamera ? "user" : "environment" },
        });

        setStream(mediaStream);

        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (err) {
        console.error("Camera permission denied:", err);
        setPermissionDenied(true);
      }
    };

    startCamera();

    // Cleanup: stop camera when component unmounts or camera switches
    return () => {
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, [useFrontCamera]);

  // -------------------------------------------------------------
  // Capture frame → compress → return base64
  // -------------------------------------------------------------
  const capturePhoto = () => {
    if (!videoRef.current) return;

    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(videoRef.current, 0, 0);

    // Compress to JPEG @ quality 0.6
    const compressed = canvas.toDataURL("image/jpeg", 0.6);
    onPhotoCaptured(compressed);
  };

  // -------------------------------------------------------------
  // Permission denied fallback UI
  // -------------------------------------------------------------
  if (permissionDenied) {
    return (
      <div className="w-full p-4 bg-red-900/40 border border-red-600 rounded-lg text-red-300 flex flex-col items-center gap-3">
        <AlertTriangle size={32} />
        <p className="text-center">
          Camera access is blocked. Please enable camera permissions in your
          device settings.
        </p>
      </div>
    );
  }

  // -------------------------------------------------------------
  // If a photo is already captured → show preview + retake
  // -------------------------------------------------------------
  if (photo) {
    return (
      <div className="w-full flex flex-col items-center gap-3">
        <img
          src={photo}
          alt="Captured"
          className="w-full max-h-64 object-cover rounded-lg border border-cyan-500 shadow-lg"
        />

        <button
          onClick={onClearPhoto}
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg flex items-center gap-2 transition"
        >
          <RefreshCcw size={18} />
          Retake Photo
        </button>
      </div>
    );
  }

  // -------------------------------------------------------------
  // Live camera preview + capture + switch camera (round button)
  // -------------------------------------------------------------
  return (
    <div className="w-full flex flex-col items-center gap-4 relative">
      {/* Live Preview */}
      <div className="relative w-full">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-full max-h-64 object-cover rounded-lg border border-cyan-500 shadow-lg"
        />

        {/* Round Switch Camera Button (bottom-center overlay) */}
        <button
          onClick={() => setUseFrontCamera((prev) => !prev)}
          className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-gray-900/80 backdrop-blur px-3 py-3 rounded-full shadow-lg border border-gray-700 hover:bg-gray-800 transition flex items-center justify-center"
        >
          <Repeat size={20} className="text-white" />
        </button>
      </div>

      {/* Capture Button */}
      <button
        onClick={capturePhoto}
        className="w-full bg-cyan-600 hover:bg-cyan-500 text-black py-3 rounded-lg flex items-center justify-center gap-2 transition"
      >
        <Camera size={20} />
        Capture Photo
      </button>
    </div>
  );
}
