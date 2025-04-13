import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ToastProvider } from "./ToastContext.jsx";
import ErrorBoundaryWrapper from "./ErrorBoundary.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToastProvider>
      <ErrorBoundaryWrapper>
        <App />
      </ErrorBoundaryWrapper>
    </ToastProvider>
  </StrictMode>
);
