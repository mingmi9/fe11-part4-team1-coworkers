import { create } from 'zustand';
import { User } from '@store/user-store';
import { createJSONStorage, persist } from 'zustand/middleware';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  isLoggedIn: boolean;
}

interface AuthAction {
  setAuthData: (data: {
    accessToken: string;
    refreshToken: string;
    user: User;
  }) => void;
  clearAuthData: () => void;
}

export const useAuthStore = create<AuthState & AuthAction>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      user: null,
      isLoggedIn: false,

      setAuthData: (data) =>
        set(() => {
          return {
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
            user: data.user,
            isLoggedIn: true,
          };
        }),

      clearAuthData: () =>
        set(() => {
          return {
            accessToken: null,
            refreshToken: null,
            user: null,
            isLoggedIn: false,
          };
        }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
