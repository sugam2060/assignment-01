import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { logout as apiLogout } from '../api';

interface User {
  user_id: number;
  email: string;
  fullname: string;
  role: string;
}

interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: async () => {
        try {
          await apiLogout();
        } catch (error) {
          console.error("Logout API failed", error);
        }
        set({ user: null });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
