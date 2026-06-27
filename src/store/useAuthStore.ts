import { create } from "zustand";

interface AuthState {
  isLoggedIn: boolean;
  user: { email: string } | null;
  signIn: (email: string) => void;
  signUp: (email: string) => void;
  signOut: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  user: null,
  signIn: (email) => set({ isLoggedIn: true, user: { email } }),
  signUp: (email) => set({ isLoggedIn: true, user: { email } }),
  signOut: () => set({ isLoggedIn: false, user: null }),
}));
