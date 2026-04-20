// -------------------------------------------------------------
// Hook: useReverseGeocode
// Purpose: Convert lat/lng → human-readable address.
// Provider: OpenStreetMap Nominatim 
// Caches results in LocalStorage to avoid repeated lookups.
// -------------------------------------------------------------

import { useEffect, useState } from "react";

export function useReverseGeocode(lat: number, lng: number) {
  const [address, setAddress] = useState<string | null>(null);

  const cacheKey = `geocode_${lat.toFixed(5)}_${lng.toFixed(5)}`;

  useEffect(() => {
    // Check cache first
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      setAddress(cached);
      return;
    }

    const fetchAddress = async () => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
        );

        const data = await res.json();

        const formatted = data?.display_name || "Unknown location";

        setAddress(formatted);

        // Cache it
        localStorage.setItem(cacheKey, formatted);
      } catch {
        setAddress("Unknown location");
      }
    };

    fetchAddress();
  }, [lat, lng]);

  return address;
}
