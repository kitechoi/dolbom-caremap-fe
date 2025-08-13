export interface Parent {
  id: string;
  name: string;
  profileImage?: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  children: Child[];
  phone: string;
  email: string;
  preferredTeachers: string[]; // 선호 선생님 ID 목록
  blockedTeachers: string[]; // 차단 선생님 ID 목록
  createdAt: Date;
  updatedAt: Date;
}

export interface Child {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female';
  specialNeeds?: string;
  allergies?: string[];
  interests?: string[];
}

export interface CareRequest {
  id: string;
  parentId: string;
  teacherId?: string;
  child: Child;
  date: Date;
  startTime: string;
  endTime: string;
  location: {
    address: string;
    lat: number;
    lng: number;
  };
  urgency: 'immediate' | 'scheduled';
  notes?: string;
  budget: {
    min: number;
    max: number;
  };
  status: RequestStatus;
  createdAt: Date;
}

export enum RequestStatus {
  SEARCHING = 'SEARCHING',
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  CONFIRMED = 'CONFIRMED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export interface SearchFilters {
  ageGroup?: string[];
  maxDistance?: number; // km
  hourlyRate?: {
    min: number;
    max: number;
  };
  availability?: {
    date: Date;
    startTime: string;
    endTime: string;
  };
  minRating?: number;
  verified?: boolean;
  specialties?: string[];
}