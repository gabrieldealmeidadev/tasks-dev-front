import { create } from "zustand";

type User = {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "USER";
};

type AuthState = {
  user: User | null;
  setUser: (user: User | null) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
