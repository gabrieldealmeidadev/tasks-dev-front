import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";
import type { ReactNode } from "react";

export function PrivateRoute({ children }: { children: ReactNode }) {
  const { data: user, isLoading, refetch } = useAuth();

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isLoading) return <p>Carregando...</p>;

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}
