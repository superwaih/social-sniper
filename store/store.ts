// stores/useAuthStore.ts
import { create } from 'zustand';

interface AuthState {
  hasLoggedIn: boolean;
    publicKey: string | null;
  setLoggedIn: (status: boolean) => void;
  resetLogin: () => void;
    setPublicKey: (key: string | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  hasLoggedIn: false,
    publicKey: null,
  setLoggedIn: (status) => set({ hasLoggedIn: status }),
    setPublicKey: (key) => set({ publicKey: key }),
  resetLogin: () => set({ hasLoggedIn: false, publicKey: null}),
}));
