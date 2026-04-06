// -------------------------------------------------------------
// Component: PageContainer
// Purpose: Provides consistent spacing for all app pages.
//
// Updated:
// - Avoids duplicating Layout padding
// - Uses consistent vertical spacing
// - Clean, minimal, design-system aligned
// - Tailwind v4 safe
// -------------------------------------------------------------

import type { ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
}

export default function PageContainer({ children }: PageContainerProps) {
  return <div className="pt-6 pb-4">{children}</div>;
}
