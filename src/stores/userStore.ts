import { create } from 'zustand';
import { User } from '@/types';

interface UserStore {
  user: User | null;
  isAuthenticated: boolean;
  
  setUser: (user: User | null) => void;
  addFavorite: (serviceId: string) => void;
  removeFavorite: (serviceId: string) => void;
  logout: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  isAuthenticated: false,
  
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  
  addFavorite: (serviceId) => 
    set((state) => ({
      user: state.user 
        ? { ...state.user, favorites: [...state.user.favorites, serviceId] }
        : null
    })),
  
  removeFavorite: (serviceId) =>
    set((state) => ({
      user: state.user
        ? { ...state.user, favorites: state.user.favorites.filter(id => id !== serviceId) }
        : null
    })),
  
  logout: () => set({ user: null, isAuthenticated: false }),
}));