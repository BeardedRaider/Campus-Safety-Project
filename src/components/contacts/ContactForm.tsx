// -------------------------------------------------------------
// Component: ContactForm
// Purpose: Reusable form for adding/editing a contact.
// Notes:
// - Controlled inputs
// - Used inside AddEditContactModal
// -------------------------------------------------------------

import type { Contact } from "../../types/contact";

interface Props {
  contact: Contact;
  onChange: (updated: Contact) => void;
}

export default function ContactForm({ contact, onChange }: Props) {
  return (
    <div className="flex flex-col gap-4">
      {/* Name Input */}
      <input
        type="text"
        placeholder="Full Name"
        value={contact.name}
        onChange={(e) => onChange({ ...contact, name: e.target.value })}
        className="bg-[#0d1226] border border-white/10 rounded-xl px-4 py-3 text-white outline-none"
      />

      {/* Phone Input */}
      <input
        type="tel"
        placeholder="Phone Number"
        value={contact.phone}
        onChange={(e) => onChange({ ...contact, phone: e.target.value })}
        className="bg-[#0d1226] border border-white/10 rounded-xl px-4 py-3 text-white outline-none"
      />
    </div>
  );
}
