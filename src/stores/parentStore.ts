import { create } from 'zustand';
import { Parent, CareRequest, SearchFilters } from '@/types';

interface ParentStore {
  currentParent: Parent | null;
  careRequests: CareRequest[];
  activeCareRequest: CareRequest | null;
  searchFilters: SearchFilters;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setCurrentParent: (parent: Parent | null) => void;
  setCareRequests: (requests: CareRequest[]) => void;
  setActiveCareRequest: (request: CareRequest | null) => void;
  setSearchFilters: (filters: SearchFilters) => void;
  updateSearchFilter: (key: keyof SearchFilters, value: any) => void;
  clearSearchFilters: () => void;
  addPreferredTeacher: (teacherId: string) => void;
  removePreferredTeacher: (teacherId: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useParentStore = create<ParentStore>((set) => ({
  currentParent: null,
  careRequests: [],
  activeCareRequest: null,
  searchFilters: {},
  isLoading: false,
  error: null,
  
  setCurrentParent: (parent) => set({ currentParent: parent }),
  setCareRequests: (requests) => set({ careRequests: requests }),
  setActiveCareRequest: (request) => set({ activeCareRequest: request }),
  setSearchFilters: (filters) => set({ searchFilters: filters }),
  
  updateSearchFilter: (key, value) =>
    set((state) => ({
      searchFilters: { ...state.searchFilters, [key]: value },
    })),
  
  clearSearchFilters: () => set({ searchFilters: {} }),
  
  addPreferredTeacher: (teacherId) =>
    set((state) => ({
      currentParent: state.currentParent
        ? {
            ...state.currentParent,
            preferredTeachers: [...state.currentParent.preferredTeachers, teacherId],
          }
        : null,
    })),
  
  removePreferredTeacher: (teacherId) =>
    set((state) => ({
      currentParent: state.currentParent
        ? {
            ...state.currentParent,
            preferredTeachers: state.currentParent.preferredTeachers.filter(
              (id) => id !== teacherId
            ),
          }
        : null,
    })),
  
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
}));