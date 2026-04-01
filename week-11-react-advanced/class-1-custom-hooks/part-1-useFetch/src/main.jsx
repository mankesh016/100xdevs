import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import App3 from "./App3.js";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <App />,
  // <App3 />,
  // </StrictMode>,
);
