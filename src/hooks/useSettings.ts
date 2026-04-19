// -------------------------------------------------------------
// Hook: useSettings
// Purpose: Load + save user tracking + safety preferences.
//
// Uses per-user storage keys:
//   appSettings_<user.id>
//
// This ensures each user has their own settings.
// -------------------------------------------------------------

import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";

export interface AppSettings {
  trackingInterval: number; // ms
  retryInterval: number; // ms
  defaultContactId: string | null;
}

// Default values used on first app launch
const DEFAULT_SETTINGS: AppSettings = {
  trackingInterval: 5 * 60 * 1000, // 5 minutes
  retryInterval: 30 * 1000, // 30 seconds
  defaultContactId: null,
};

export function useSettings() {
  const { user } = useAuth();

  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);

  // -------------------------------------------------------------
  // Load settings ONLY when user.id is available
  // -------------------------------------------------------------
  useEffect(() => {
    if (!user?.id) return; // wait for user

    const key = `appSettings_${user.id}`;
    const stored = localStorage.getItem(key);

    if (stored) {
      try {
        setSettings(JSON.parse(stored));
      } catch {
        console.error("Failed to parse settings");
        setSettings(DEFAULT_SETTINGS);
      }
    } else {
      // First time user → save defaults
      localStorage.setItem(key, JSON.stringify(DEFAULT_SETTINGS));
      setSettings(DEFAULT_SETTINGS);
    }
  }, [user?.id]);

  // -------------------------------------------------------------
  // Save settings for this user
  // -------------------------------------------------------------
  const saveSettings = (newSettings: AppSettings) => {
    if (!user?.id) return;

    const key = `appSettings_${user.id}`;
    localStorage.setItem(key, JSON.stringify(newSettings));
    setSettings(newSettings);
  };

  return { settings, saveSettings };
}
