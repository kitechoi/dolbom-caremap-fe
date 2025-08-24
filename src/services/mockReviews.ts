import { Review } from '@/types';

export const mockReviews: Review[] = [
  // 박지혜 선생님 (id: 3) - 67개 리뷰 중 대표 5개
  {
    id: 'review-1',
    teacherId: '3',
    parentId: 'parent-1',
    parentName: '박지민',
    rating: 5,
    comment: '갑자기 야근이 잡혀서 급하게 부탁드렸는데 20분도 안 되어서 도착하셨어요. 아이도 처음 보는 선생님인데 금방 친해졌어요.',
    tags: ['빠른 도착', '아이가 좋아해요', '시간약속 잘 지켜요'],
    createdAt: new Date('2025-08-10'),
  },
  {
    id: 'review-2',
    teacherId: '3',
    parentId: 'parent-2',
    parentName: '이서연',
    rating: 5,
    comment: '아이 하원 도움 부탁드렸어요. 학원 차로 안전하게 데려다 주시고 숙제도 봐주셨어요.',
    tags: ['안전한 하원', '숙제 도움', '책임감 있어요'],
    createdAt: new Date('2025-07-22'),
  },
  {
    id: 'review-3',
    teacherId: '3',
    parentId: 'parent-3',
    parentName: '김민수',
    rating: 5,
    comment: '병원 가야 해서 급하게 2시간 돌봄 부탁드렸는데 정말 잘 놀아주셨어요. 다음에도 꼭 부탁드리고 싶어요.',
    tags: ['긴급돌봄', '아이가 좋아해요'],
    createdAt: new Date('2025-06-15'),
  },
  {
    id: 'review-4',
    teacherId: '3',
    parentId: 'parent-4',
    parentName: '조민아',
    rating: 4,
    comment: '회사 행사로 늦게 끝나서 급하게 연락드렸는데 빠르게 와주셨어요. 아이도 잘 따라서 안심이었어요.',
    tags: ['빠른 응답', '안심돼요'],
    createdAt: new Date('2025-04-08'),
  },
  {
    id: 'review-5',
    teacherId: '3',
    parentId: 'parent-5',
    parentName: '한소영',
    rating: 5,
    comment: '주말에 급하게 외출해야 해서 부탁드렸는데 아이랑 즐겁게 시간 보내주셨어요. 맘시*에서 40회 경력이 있으셔서 믿고 맡길 수 있었어요.',
    tags: ['경험 많아요', '주말 돌봄', '아이가 좋아해요'],
    createdAt: new Date('2025-02-20'),
  },
  
  // 이수진 선생님 (id: 2) - 56개 리뷰 중 대표 5개
  {
    id: 'review-6',
    teacherId: '2',
    parentId: 'parent-6',
    parentName: '최은정',
    rating: 5,
    comment: '회의가 길어져서 급하게 연락드렸는데 30분 만에 오셨어요. 아이를 정말 잘 다루시네요.',
    tags: ['빠른 응답', '경험 많아요', '안심돼요'],
    createdAt: new Date('2025-08-05'),
  },
  {
    id: 'review-7',
    teacherId: '2',
    parentId: 'parent-7',
    parentName: '장현우',
    rating: 5,
    comment: '아이 등하원 도움 부탁드렸어요. 시간 약속 잘 지켜주시고 안전하게 데려다 주셨어요.',
    tags: ['등하원 도움', '시간 정확'],
    createdAt: new Date('2025-07-10'),
  },
  {
    id: 'review-8',
    teacherId: '2',
    parentId: 'parent-8',
    parentName: '박성훈',
    rating: 4,
    comment: '갑작스러운 출장으로 3시간 돌봄 부탁드렸는데 아이가 잘 따랐어요. 숙제도 보아주셨어요.',
    tags: ['긴급돌봄', '숙제 도움'],
    createdAt: new Date('2025-05-18'),
  },
  {
    id: 'review-9',
    teacherId: '2',
    parentId: 'parent-9',
    parentName: '김지연',
    rating: 5,
    comment: '새벽에 급한 일이 생겨서 아침 일찍 부탁드렸는데 흔쾌히 와주셨어요. 자란*에서 25회 경력이 있어서 믿고 맡길 수 있었어요.',
    tags: ['새벽 돌봄', '경험 많아요'],
    createdAt: new Date('2025-03-25'),
  },
  {
    id: 'review-10',
    teacherId: '2',
    parentId: 'parent-10',
    parentName: '이지훈',
    rating: 5,
    comment: '주말 가족모임에 급하게 참석해야 해서 부탁드렸어요. 아이가 선생님을 너무 좋아해요.',
    tags: ['주말 돌봄', '아이가 좋아해요'],
    createdAt: new Date('2025-01-30'),
  },
];

export const getReviewsByTeacherId = (teacherId: string): Review[] => {
  return mockReviews.filter(review => review.teacherId === teacherId);
};

// 각 선생님의 실제 reviewCount와 일치:
// id '1' (김은영): 42개 - 프로필에만 표시
// id '2' (이수진): 56개 - 5개 후기 표시
// id '3' (박지혜): 67개 - 5개 후기 표시
// id '4' (최민정): 28개 - 프로필에만 표시
// id '5' (정유진): 38개 - 프로필에만 표시