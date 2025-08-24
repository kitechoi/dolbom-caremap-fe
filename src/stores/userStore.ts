import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
  parentId: string;
}

interface UserStore {
  user: User | null;
  isAuthenticated: boolean;
  
  // Actions
  setUser: (user: User) => void;
  logout: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  // 초기 상태 - 김은영님이 부모로 로그인된 상태
  user: {
    id: 'user-1',
    name: '김은영',
    email: 'kim@example.com',
    parentId: 'parent-1',
  },
  isAuthenticated: true,

  setUser: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));