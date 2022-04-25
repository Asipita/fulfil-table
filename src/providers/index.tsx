import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      refetchOnWindowFocus: false,
    },
  },
});

export default function Providers({ children }) {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </React.StrictMode>
  );
}
