export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-sm mx-auto bg-[#1A1A1A] border-t border-[#333] text-white h-16 flex items-center justify-around">
      <button className="flex flex-col items-center text-xs">
        <span className="text-lg">🏠</span>
        Home
      </button>

      <button className="flex flex-col items-center text-xs">
        <span className="text-lg">📞</span>
        Contacts
      </button>

      <button className="flex flex-col items-center text-xs">
        <span className="text-lg">📍</span>
        Check‑Ins
      </button>

      <button className="flex flex-col items-center text-xs">
        <span className="text-lg">⚙️</span>
        Settings
      </button>
    </nav>
  );
}
