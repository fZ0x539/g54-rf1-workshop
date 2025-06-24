import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "react-icons";
import { RouterProvider } from "react-router";
import "./App.css";
import router from "./routes.ts";

const queryClient = new QueryClient();
// @ts-ignore
window.__TANSTACK_QUERY_CLIENT__ = queryClient;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider  router={router} />
    </QueryClientProvider>
  </StrictMode>
);
