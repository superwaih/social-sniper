// stores/useAuthStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DEFAULT_THEME_INDEX } from '@/utils/themes';

interface AuthState {
  hasLoggedIn: boolean;
  publicKey: string | null;
  setLoggedIn: (status: boolean) => void;
  resetLogin: () => void;
  setPublicKey: (key: string | null) => void;
}

interface ThemeState {
  selectedTheme: number;
  setSelectedTheme: (themeIndex: number) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  hasLoggedIn: false,
  publicKey: null,
  setLoggedIn: (status) => set({ hasLoggedIn: status }),
  setPublicKey: (key) => set({ publicKey: key }),
  resetLogin: () => set({ hasLoggedIn: false, publicKey: null }),
}));

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      selectedTheme: DEFAULT_THEME_INDEX,
      setSelectedTheme: (themeIndex: number) => set({ selectedTheme: themeIndex }),
    }),
    {
      name: 'theme-storage',
    }
  )
);
