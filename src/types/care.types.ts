// 기존 돌봄 서비스 관련 타입 (호환성 유지)
export interface CareService {
  id: string;
  name: string;
  type: CareServiceType;
  address: string;
  location: {
    lat: number;
    lng: number;
  };
  phone: string;
  hours: string;
  description: string;
  rating: number;
  reviewCount: number;
  services: string[];
  images: string[];
  createdAt: Date;
  updatedAt: Date;
}

export enum CareServiceType {
  DAYCARE = 'DAYCARE',
  ELDERLY_CARE = 'ELDERLY_CARE',
  DISABILITY_CARE = 'DISABILITY_CARE',
  CHILD_CARE = 'CHILD_CARE',
  MEDICAL_CARE = 'MEDICAL_CARE',
  OTHER = 'OTHER'
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  favorites: string[];
}