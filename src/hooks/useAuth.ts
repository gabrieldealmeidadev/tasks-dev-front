import { useQuery } from "@tanstack/react-query";
import { api } from "../api/client";
import { useAuthStore } from "../store/auth";

export function useAuth() {
  const setUser = useAuthStore((state) => state.setUser);

  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const response = await api.get("/auth/me");
      setUser(response.data);
      return response.data;
    },
    retry: false,
    enabled: true,
  });
}
