// stores/useAuthStore.ts
import { create } from 'zustand';

interface AuthState {
  hasLoggedIn: boolean;
  setLoggedIn: (status: boolean) => void;
  resetLogin: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  hasLoggedIn: false,
  setLoggedIn: (status) => set({ hasLoggedIn: status }),
  resetLogin: () => set({ hasLoggedIn: false }),
}));
