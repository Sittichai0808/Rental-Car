import { QueryClient } from "@tanstack/react-query";
import axios from "axios";

export const apiClient = axios.create({
  baseURL: "http://localhost:4000",
  timeout: 1000,
});

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnmount: false,
      refetchOnReconnect: false,
      retry: 1,
      staleTime: 0,
    },
  },
});
