import React from "react";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ContextApiProvider } from "./contextApi/ContextApi.jsx";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // ✅ Correct import

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
        <ContextApiProvider>
          <App />
        </ContextApiProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
