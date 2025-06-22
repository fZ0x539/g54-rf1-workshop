import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "react-icons";
import "./App.css";
import App from "./App.tsx";

const queryClient = new QueryClient();
// @ts-ignore
window.__TANSTACK_QUERY_CLIENT__ = queryClient


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
);
