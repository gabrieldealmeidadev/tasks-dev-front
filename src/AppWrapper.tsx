import { useAuth } from "./hooks/useAuth";
import { AppRoutes } from "./routes";

export function AppWrapper() {
  useAuth();

  return <AppRoutes />;
}
