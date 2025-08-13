import { CareRequest, RequestStatus, Child } from '@/types';

export const mockCareRequests: CareRequest[] = [
  {
    id: 'req1',
    parentId: 'parent1',
    teacherId: undefined,
    child: {
      id: 'child1',
      name: '민지',
      age: 3,
      gender: 'female',
      interests: ['그림그리기', '블록놀이'],
    },
    date: new Date(),
    startTime: '14:00',
    endTime: '18:00',
    location: {
      address: '서울시 중구 명동',
      lat: 37.5665,
      lng: 126.9780,
    },
    urgency: 'scheduled',
    notes: '낮잠 시간에 맞춰 재워주세요',
    budget: {
      min: 12000,
      max: 18000,
    },
    status: RequestStatus.PENDING,
    createdAt: new Date(),
  },
  {
    id: 'req2',
    parentId: 'parent2',
    teacherId: undefined,
    child: {
      id: 'child2',
      name: '준서',
      age: 5,
      gender: 'male',
      interests: ['축구', '레고'],
      allergies: ['땅콩'],
    },
    date: new Date(),
    startTime: '16:00',
    endTime: '20:00',
    location: {
      address: '서울시 종로구 인사동',
      lat: 37.5700,
      lng: 126.9850,
    },
    urgency: 'immediate',
    notes: '땅콩 알레르기가 있어요. 저녁 식사 준비 부탁드립니다.',
    budget: {
      min: 15000,
      max: 20000,
    },
    status: RequestStatus.SEARCHING,
    createdAt: new Date(),
  },
  {
    id: 'req3',
    parentId: 'parent3',
    teacherId: undefined,
    child: {
      id: 'child3',
      name: '서연',
      age: 7,
      gender: 'female',
      interests: ['피아노', '책읽기'],
    },
    date: new Date(Date.now() + 86400000), // 내일
    startTime: '15:00',
    endTime: '19:00',
    location: {
      address: '서울시 중구 을지로',
      lat: 37.5600,
      lng: 126.9750,
    },
    urgency: 'scheduled',
    notes: '숙제를 먼저 끝내고 놀 수 있도록 지도해주세요',
    budget: {
      min: 14000,
      max: 18000,
    },
    status: RequestStatus.PENDING,
    createdAt: new Date(),
  },
];

export const mockParentNames = [
  '박미영 부모님',
  '이정호 부모님',
  '김서연 부모님',
  '최민수 부모님',
  '정은지 부모님',
];