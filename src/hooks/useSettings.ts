// -------------------------------------------------------------
// Hook: useSettings
// Purpose: Load + save user tracking + safety preferences.
//
// Settings include:
// - trackingInterval (ms)
// - retryInterval (ms)
// - defaultEmergencyContact (contact ID)
//
// Stored in localStorage so they persist across sessions.
// -------------------------------------------------------------

import { useState, useEffect } from "react";

export interface AppSettings {
  trackingInterval: number; // stored in ms
  retryInterval: number; // stored in ms
  defaultContactId: string | null;
}

// Default values used on first app launch
const DEFAULT_SETTINGS: AppSettings = {
  trackingInterval: 5 * 60 * 1000, // 5 minutes
  retryInterval: 30 * 1000, // 30 seconds
  defaultContactId: null,
};

export function useSettings() {
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);

  // -------------------------------------------------------------
  // Load settings from localStorage on mount
  // -------------------------------------------------------------
  useEffect(() => {
    const stored = localStorage.getItem("appSettings");
    if (stored) setSettings(JSON.parse(stored));
  }, []);

  // -------------------------------------------------------------
  // Save settings to localStorage
  // -------------------------------------------------------------
  const saveSettings = (newSettings: AppSettings) => {
    setSettings(newSettings);
    localStorage.setItem("appSettings", JSON.stringify(newSettings));
  };

  return {
    settings,
    saveSettings,
  };
}
