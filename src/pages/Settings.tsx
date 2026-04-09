// -------------------------------------------------------------
// Page: Settings
// Purpose: Configure tracking + retry intervals + default contact
//
// UI uses dropdowns instead of raw ms inputs.
// Values are stored in ms internally but displayed human-friendly.
// -------------------------------------------------------------

import PageContainer from "../components/PageContainer";
import { useSettings } from "../hooks/useSettings";
import { useState, useEffect } from "react";

export default function Settings() {
  const { settings, saveSettings } = useSettings();

  // -------------------------------------------------------------
  // Load stored contacts from localStorage
  // -------------------------------------------------------------
  const [contacts, setContacts] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("contacts");
    if (stored) {
      setContacts(JSON.parse(stored));
    }
  }, []);

  // -------------------------------------------------------------
  // Local editable state
  // -------------------------------------------------------------
  const [trackingInterval, setTrackingInterval] = useState(
    settings.trackingInterval,
  );
  const [retryInterval, setRetryInterval] = useState(settings.retryInterval);
  const [defaultContactId, setDefaultContactId] = useState(
    settings.defaultContactId,
  );

  // -------------------------------------------------------------
  // Dropdown options (stored in ms)
  // -------------------------------------------------------------
  const trackingOptions = [
    { label: "5 minutes", value: 5 * 60 * 1000 },
    { label: "10 minutes", value: 10 * 60 * 1000 },
    { label: "15 minutes", value: 15 * 60 * 1000 },
    { label: "20 minutes", value: 20 * 60 * 1000 },
    { label: "Until stopped", value: 0 }, // special case
  ];

  const retryOptions = [
    { label: "10 seconds", value: 10 * 1000 },
    { label: "20 seconds", value: 20 * 1000 },
    { label: "30 seconds", value: 30 * 1000 },
    { label: "1 minute", value: 1 * 60 * 1000 },
    { label: "3 minutes", value: 3 * 60 * 1000 },
    { label: "5 minutes", value: 5 * 60 * 1000 },
  ];

  // -------------------------------------------------------------
  // Save handler
  // -------------------------------------------------------------
  const handleSave = () => {
    saveSettings({
      trackingInterval,
      retryInterval,
      defaultContactId,
    });
  };

  return (
    <PageContainer>
      <h1 className="text-2xl font-bold text-white mb-6">Settings</h1>

      {/* Tracking Interval */}
      <div className="mb-6">
        <label className="block text-gray-300 mb-2">Tracking Interval</label>
        <select
          value={trackingInterval}
          onChange={(e) => setTrackingInterval(Number(e.target.value))}
          className="w-full p-3 rounded-lg bg-[#0a0f1c] border border-cyan-400 text-white"
        >
          {trackingOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Retry Interval */}
      <div className="mb-6">
        <label className="block text-gray-300 mb-2">Retry Interval</label>
        <select
          value={retryInterval}
          onChange={(e) => setRetryInterval(Number(e.target.value))}
          className="w-full p-3 rounded-lg bg-[#0a0f1c] border border-purple-400 text-white"
        >
          {retryOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Default Emergency Contact */}
      <div className="mb-6">
        <label className="block text-gray-300 mb-2">
          Default Emergency Contact
        </label>
        <select
          value={defaultContactId ?? ""}
          onChange={(e) => setDefaultContactId(e.target.value)}
          className="w-full p-3 rounded-lg bg-[#0a0f1c] border border-yellow-400 text-white"
        >
          <option value="">Select contact</option>

          {contacts.length === 0 && <option disabled>No contacts saved</option>}

          {contacts.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Save Button */}
      <button onClick={handleSave} className="btn-base btn-cyan w-full mt-4">
        Save Settings
      </button>
    </PageContainer>
  );
}
