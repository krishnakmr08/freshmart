import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { mmkvStorage } from './storage';

interface AuthStore {
  user: Record<string, any> | null;
  currentOrder: any;
  setUser: (user: Record<string, any> | null) => void;
  setCurrentOrder: (order: any) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    set => ({
      user: null,
      currentOrder: null,

      setUser: user => set({ user }),
      setCurrentOrder: order => set({ currentOrder: order }),

      logout: () => set({ user: null, currentOrder: null }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => mmkvStorage),
    },
  ),
);
