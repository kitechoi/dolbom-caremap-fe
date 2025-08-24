import { Review } from '@/types';

export const mockReviews: Review[] = [
  {
    id: 'review-1',
    teacherId: '3',
    parentId: 'parent-2',
    parentName: '박지민',
    rating: 5,
    comment: '갑자기 야근이 잡혀서 급하게 부탁드렸는데 20분도 안 되어서 도착하셨어요. 아이도 처음 보는 선생님인데 금방 친해졌어요.',
    tags: ['빠른 도착', '아이가 좋아해요', '시간약속 잘 지켜요'],
    createdAt: new Date('2024-01-05'),
  },
  {
    id: 'review-2',
    teacherId: '3',
    parentId: 'parent-3',
    parentName: '이서연',
    rating: 5,
    comment: '아이 하원 도움 부탁드렸어요. 학원 차로 안전하게 데려다 주시고 숙제도 봐주셨어요. 맘시*에서 40회 경력이 있으셔서 믿고 맡겼어요.',
    tags: ['안전한 하원', '숙제 도움', '경험 많아요'],
    createdAt: new Date('2024-01-03'),
  },
  {
    id: 'review-3',
    teacherId: '3',
    parentId: 'parent-4',
    parentName: '김민수',
    rating: 5,
    comment: '병원 가야 해서 급하게 2시간 돌봄 부탁드렸는데 정말 잘 놀아주셨어요. 다음에도 꼭 부탁드리고 싶어요.',
    tags: ['긴급돌봄', '아이가 좋아해요'],
    createdAt: new Date('2023-12-28'),
  },
  {
    id: 'review-4',
    teacherId: '2',
    parentId: 'parent-5',
    parentName: '최은정',
    rating: 5,
    comment: '회의가 길어져서 급하게 연락드렸는데 30분 만에 오셨어요. 자란*에서 25회 경력이 있으셔서 그런지 아이를 잘 다루시네요.',
    tags: ['빠른 응답', '경험 많아요', '안심돼요'],
    createdAt: new Date('2024-01-04'),
  },
  {
    id: 'review-5',
    teacherId: '2',
    parentId: 'parent-6',
    parentName: '장현우',
    rating: 4,
    comment: '아이 등하원 도움 부탁드렸어요. 시간 약속 잘 지켜주시고 안전하게 데려다 주셨어요.',
    tags: ['등하원 도움', '시간 정확'],
    createdAt: new Date('2023-12-30'),
  },
  {
    id: 'review-6',
    teacherId: '5',
    parentId: 'parent-7',
    parentName: '강수진',
    rating: 5,
    comment: '저녁 약속이 갑자기 잡혀서 급하게 부탁드렸는데 흔쾌히 와주셨어요. 아이와 영어 놀이도 하면서 재미있게 놀아주셨어요.',
    tags: ['긴급돌봄', '영어놀이', '친절해요'],
    createdAt: new Date('2024-01-02'),
  },
  {
    id: 'review-7',
    teacherId: '4',
    parentId: 'parent-8',
    parentName: '윤지혜',
    rating: 4,
    comment: '아직 2학년이지만 맘시*에서 12회 경력이 있으셔서 믿고 맡겼어요. 아이 숙제도 봐주시고 잘 놀아주셨어요.',
    tags: ['숙제 도움', '책임감 있어요'],
    createdAt: new Date('2023-12-25'),
  },
];

export const getReviewsByTeacherId = (teacherId: string): Review[] => {
  return mockReviews.filter(review => review.teacherId === teacherId);
};