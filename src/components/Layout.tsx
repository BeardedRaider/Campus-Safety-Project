import type { ReactNode } from "react";
import BottomNav from "./BottomNav";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen max-w-sm mx-auto bg-[#0D0D0D] text-white relative">
      <div className="pb-20">{children}</div>
      <BottomNav />
    </div>
  );
}
