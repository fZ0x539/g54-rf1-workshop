import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "react-icons";
import "./App.css";
import App from "./App.tsx";

const queryClient = new QueryClient();
// @ts-ignore
window.__TANSTACK_QUERY_CLIENT__ = queryClient


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
      
      <App />
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
