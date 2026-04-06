import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  appType: "spa",

  // -------------------------------------------------------------
  // Fix: Ensure correct asset paths in production (Vercel)
  // -------------------------------------------------------------
  base: "/",
});
