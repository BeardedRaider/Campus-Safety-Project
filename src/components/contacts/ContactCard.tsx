// -------------------------------------------------------------
// Component: ContactCard
// Purpose: Display a single emergency contact with edit/delete
//          actions. Used inside the Contacts page list.
// -------------------------------------------------------------

import { Pencil, Trash2 } from "lucide-react";
import type { Contact } from "../../types/contact";

interface Props {
  contact: Contact;
  onEdit: (contact: Contact) => void;
  onDelete: (id: string) => void;
}

export default function ContactCard({ contact, onEdit, onDelete }: Props) {
  return (
    <div className="bg-[#0d1226] border border-white/10 rounded-xl p-4 flex justify-between items-center">
      <div>
        <p className="text-white font-medium">{contact.name}</p>
        <p className="text-gray-400 text-sm">{contact.phone}</p>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => onEdit(contact)}
          className="text-cyan-300 hover:text-cyan-200 transition"
        >
          <Pencil size={20} />
        </button>

        <button
          onClick={() => onDelete(contact.id)}
          className="text-red-400 hover:text-red-300 transition"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
}
