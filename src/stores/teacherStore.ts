import { create } from 'zustand';
import { Teacher, TeacherSchedule, TeacherStats, TeacherStatus } from '@/types';

interface TeacherStore {
  teachers: Teacher[];
  currentTeacher: Teacher | null;
  selectedTeacher: Teacher | null;
  nearbyTeachers: Teacher[];
  schedule: TeacherSchedule[];
  stats: TeacherStats | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setTeachers: (teachers: Teacher[]) => void;
  setCurrentTeacher: (teacher: Teacher | null) => void;
  setSelectedTeacher: (teacher: Teacher | null) => void;
  setNearbyTeachers: (teachers: Teacher[]) => void;
  updateTeacherStatus: (teacherId: string, status: TeacherStatus) => void;
  updateActivityRadius: (teacherId: string, radius: 500 | 1000 | 2000) => void;
  setSchedule: (schedule: TeacherSchedule[]) => void;
  setStats: (stats: TeacherStats) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useTeacherStore = create<TeacherStore>((set) => ({
  teachers: [],
  currentTeacher: null,
  selectedTeacher: null,
  nearbyTeachers: [],
  schedule: [],
  stats: null,
  isLoading: false,
  error: null,
  
  setTeachers: (teachers) => set({ teachers }),
  setCurrentTeacher: (teacher) => set({ currentTeacher: teacher }),
  setSelectedTeacher: (teacher) => set({ selectedTeacher: teacher }),
  setNearbyTeachers: (teachers) => set({ nearbyTeachers: teachers }),
  
  updateTeacherStatus: (teacherId, status) =>
    set((state) => ({
      teachers: state.teachers.map((t) =>
        t.id === teacherId ? { ...t, status } : t
      ),
      currentTeacher:
        state.currentTeacher?.id === teacherId
          ? { ...state.currentTeacher, status }
          : state.currentTeacher,
    })),
  
  updateActivityRadius: (teacherId, radius) =>
    set((state) => ({
      teachers: state.teachers.map((t) =>
        t.id === teacherId ? { ...t, activityRadius: radius } : t
      ),
      currentTeacher:
        state.currentTeacher?.id === teacherId
          ? { ...state.currentTeacher, activityRadius: radius }
          : state.currentTeacher,
    })),
  
  setSchedule: (schedule) => set({ schedule }),
  setStats: (stats) => set({ stats }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
}));