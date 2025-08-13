export interface Teacher {
  id: string;
  name: string;
  profileImage?: string;
  bio: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  activityRadius: 500 | 1000 | 2000; // 활동반경 (미터)
  status: TeacherStatus;
  hourlyRate: number;
  experience: number; // 경력 (년)
  specialties: string[];
  ageGroups: AgeGroup[];
  availability: Availability[];
  rating: number;
  reviewCount: number;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastActiveAt: Date;
  phone: string;
  responseTime: string; // "보통 30분 이내"
  certificatesCount: number;
  completedCareCount: number;
}

export enum TeacherStatus {
  AVAILABLE = 'AVAILABLE',     // 🟢 지금 가능
  RESERVABLE = 'RESERVABLE',   // 🟡 예약 가능
  UNAVAILABLE = 'UNAVAILABLE'  // ⚫ 불가
}

export enum AgeGroup {
  INFANT = 'INFANT',         // 0-1세
  TODDLER = 'TODDLER',       // 1-3세
  PRESCHOOL = 'PRESCHOOL',   // 3-5세
  ELEMENTARY = 'ELEMENTARY'  // 6-12세
}

export interface Availability {
  dayOfWeek: number; // 0-6 (일-토)
  startTime: string;  // "09:00"
  endTime: string;    // "18:00"
  isRecurring: boolean;
}

export interface Review {
  id: string;
  teacherId: string;
  parentId: string;
  parentName: string;
  rating: number;
  comment: string;
  tags: string[]; // ["친절해요", "시간약속 잘 지켜요", "아이가 좋아해요"]
  createdAt: Date;
}

export interface TeacherSchedule {
  id: string;
  teacherId: string;
  parentId: string;
  childAge: number;
  date: Date;
  startTime: string;
  endTime: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  location: string;
  notes?: string;
  totalAmount: number;
}

export interface TeacherStats {
  totalRequests: number;
  acceptedRequests: number;
  completedCare: number;
  responseRate: number;
  averageRating: number;
  thisMonthEarnings: number;
  todaySchedule: number;
  weekSchedule: number;
}