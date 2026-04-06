import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],

  // -------------------------------------------------------------
  // Fix: Ensure Vercel serves index.html for all routes
  // Purpose: Prevent 404 errors on client-side routes (/app, /login, etc.)
  // -------------------------------------------------------------
  appType: "spa",
});
