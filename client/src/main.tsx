// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import GlobalProvider from "./context/global/GlobalProvider.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: false,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <BrowserRouter>
    {/* <Auth0ProviderComponent> */}
    <QueryClientProvider client={queryClient}>
      <GlobalProvider>
        <App />
      </GlobalProvider>
      {/* </Auth0ProviderComponent> */}
    </QueryClientProvider>
  </BrowserRouter>
  // </StrictMode>
);
