// -------------------------------------------------------------
// Hook: useCheckIns
// Purpose: Manage check-in entries with localStorage persistence.
//
// Features:
// - Load check-ins from localStorage on mount
// - Save check-ins whenever they change
// - Add new check-in
// - Delete check-in
//
// Notes:
// - Supports optional `photo` field on CheckIn
// -------------------------------------------------------------

import { useEffect, useState } from "react";
import type { CheckIn } from "../types/CheckIn";

const STORAGE_KEY = "checkIns";

export function useCheckIns() {
  const [checkIns, setCheckIns] = useState<CheckIn[]>([]);

  // -------------------------------------------------------------
  // Load check-ins from localStorage on mount
  // -------------------------------------------------------------
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed: CheckIn[] = JSON.parse(saved);
        setCheckIns(parsed);
      } catch {
        console.error("Failed to parse check-ins from localStorage");
      }
    }
  }, []);

  // -------------------------------------------------------------
  // Persist check-ins to localStorage whenever they change
  // -------------------------------------------------------------
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(checkIns));
  }, [checkIns]);

  // -------------------------------------------------------------
  // Add a new check-in
  // -------------------------------------------------------------
  const addCheckIn = (checkIn: CheckIn) => {
    setCheckIns((prev) => [checkIn, ...prev]);
  };

  // -------------------------------------------------------------
  // Delete a check-in by id
  // -------------------------------------------------------------
  const deleteCheckIn = (id: string) => {
    setCheckIns((prev) => prev.filter((c) => c.id !== id));
  };

  return {
    checkIns,
    addCheckIn,
    deleteCheckIn,
  };
}
