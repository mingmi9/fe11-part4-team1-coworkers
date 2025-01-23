import { create } from 'zustand';
import { taskLists } from './task-list-store';

export interface Group {
  updatedAt: string;
  createdAt: string;
  image: string | null;
  name: string;
  id: number;
  members: Member[];
  taskLists: taskLists;
}

interface Member {
  role: 'ADMIN' | 'MEMBER';
  userImage: string | null;
  userEmail: string;
  userName: string;
  groupId: number;
  userId: number;
}

interface GroupState {
  group: Group | null;
  members: Member[];
}

interface GroupActions {
  setGroup: (group: Group) => void;
  clearGroup: () => void;
  setGroupMembers: (members: Member[]) => void;
}

export const useGroupStore = create<GroupState & GroupActions>((set) => ({
  group: null,
  members: [],
  setGroup: (group) => set({ group }),
  clearGroup: () => set({ group: null }),
  setGroupMembers: (members: Member[]) => set({ members: members }),
}));
