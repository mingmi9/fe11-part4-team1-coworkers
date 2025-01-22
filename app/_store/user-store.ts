import { create } from 'zustand';

export interface User {
  id: number;
  email: string;
  nickname: string;
  image: string | null;
}

interface UserState {
  user: User | null;
}

interface UserAction {
  setUser: (user: UserState[`user`]) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState & UserAction>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
