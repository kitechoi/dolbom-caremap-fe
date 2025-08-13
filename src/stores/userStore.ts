import { create } from 'zustand';

export type UserRole = 'parent' | 'teacher';

interface User {
  id: string;
  name: string;
  email: string;
  roles: UserRole[]; // 한 사용자가 여러 역할을 가질 수 있음
  currentRole: UserRole; // 현재 선택된 역할
  teacherId?: string; // 선생님 역할일 때의 ID
  parentId?: string; // 부모 역할일 때의 ID
}

interface UserStore {
  user: User | null;
  isAuthenticated: boolean;
  
  // Actions
  setUser: (user: User) => void;
  switchRole: (role: UserRole) => void;
  logout: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  // 초기 상태 - 김은영 선생님으로 로그인된 상태
  user: {
    id: 'user-1',
    name: '김은영',
    email: 'kim@example.com',
    roles: ['teacher', 'parent'], // 선생님이면서 부모
    currentRole: 'teacher',
    teacherId: 'teacher-1',
    parentId: 'parent-1',
  },
  isAuthenticated: true,

  setUser: (user) => set({ user, isAuthenticated: true }),
  
  switchRole: (role) => 
    set((state) => {
      if (!state.user || !state.user.roles.includes(role)) {
        return state;
      }
      return {
        user: {
          ...state.user,
          currentRole: role,
        },
      };
    }),
  
  logout: () => set({ user: null, isAuthenticated: false }),
}));