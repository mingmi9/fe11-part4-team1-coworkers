import { create } from 'zustand';

interface User {
  id: number;
  email: string;
  nickname: string;
  image: string | null;
}

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

export const useAuthStore = create<AuthState & AuthAction>((set) => ({
  accessToken: localStorage.getItem('accessToken') || null,
  refreshToken: localStorage.getItem('refreshToken') || null,
  user: null,
  isLoggedIn: !!localStorage.getItem('accessToken'),

  setAuthData: (data) =>
    set(() => {
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      return {
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        user: data.user,
        isLoggedIn: true,
      };
    }),

  clearAuthData: () =>
    set(() => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      return {
        accessToken: null,
        refreshToken: null,
        user: null,
        isLoggedIn: false,
      };
    }),
}));
