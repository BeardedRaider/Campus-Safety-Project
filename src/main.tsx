import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

import "./styles/index.css";
import "./styles/safe-area.css";

const root = document.getElementById("root") as HTMLElement;

ReactDOM.createRoot(root).render(
  <RouterProvider router={router} />
);

// Register service worker for PWA support
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js");
  });
}

