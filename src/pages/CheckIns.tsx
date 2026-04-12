// -------------------------------------------------------------
// Page: CheckIns
// Purpose: Display recent check-ins + allow creating new ones.
//
// Features:
// - Floating + button (same as Contacts)
// - NewCheckInModal for note + photo
// - Uses useCheckIns for storage
// - Clean, modular layout
// - Updated to support animated button inside modal
// -------------------------------------------------------------

import { useState } from "react";
import PageContainer from "../components/PageContainer";
import { useCheckIns } from "../hooks/useCheckIns";
import type { CheckIn } from "../types/CheckIn";
import CheckInList from "../components/checkins/CheckInList";
import NewCheckInModal from "../components/checkins/NewCheckInModal";
import { Plus } from "lucide-react";

export default function CheckIns() {
  const { checkIns, addCheckIn, deleteCheckIn } = useCheckIns();

  const [modalOpen, setModalOpen] = useState(false);

  // -------------------------------------------------------------
  // Handle creating a new check-in (called by modal)
  // Returns TRUE or FALSE so the modal can animate success/error
  // -------------------------------------------------------------
  const handleCreateCheckIn = async (data: {
    note: string;
    photo: string | null;
  }): Promise<boolean> => {
    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          if (!pos?.coords) {
            resolve(false);
            return;
          }

          const newCheckIn: CheckIn = {
            id: crypto.randomUUID(),
            timestamp: Date.now(),
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
            accuracy: pos.coords.accuracy,
            note: data.note || undefined,
            photo: data.photo || undefined,
          };

          addCheckIn(newCheckIn);
          resolve(true);
        },
        () => resolve(false),
      );
    });
  };

  // -------------------------------------------------------------
  // Render
  // -------------------------------------------------------------
  return (
    <PageContainer>
      <h1 className="text-2xl font-semibold mb-6">Check-Ins</h1>

      {/* Recent Check-Ins */}
      <CheckInList checkIns={checkIns} onDelete={deleteCheckIn} />

      {/* Floating Add Button */}
      <button
        onClick={() => setModalOpen(true)}
        className="fixed bottom-24 right-6 bg-cyan-500 text-black p-4 rounded-full shadow-lg"
      >
        <Plus size={24} />
      </button>

      {/* New Check-In Modal */}
      <NewCheckInModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleCreateCheckIn}
      />
    </PageContainer>
  );
}
