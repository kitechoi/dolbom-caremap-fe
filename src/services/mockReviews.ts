import { Review } from '@/types';

export const mockReviews: Review[] = [
  {
    id: 'review-1',
    teacherId: '1',
    parentId: 'parent-2',
    parentName: '박지민',
    rating: 5,
    comment: '정말 친절하시고 아이가 너무 좋아해요. 숙제도 꼼꼼하게 봐주시고 간식도 챙겨주셔서 감사했습니다.',
    tags: ['친절해요', '시간약속 잘 지켜요', '아이가 좋아해요'],
    createdAt: new Date('2024-01-05'),
  },
  {
    id: 'review-2',
    teacherId: '1',
    parentId: 'parent-3',
    parentName: '이서연',
    rating: 5,
    comment: '급하게 부탁드렸는데도 빠르게 응답해주시고 와주셔서 정말 감사했어요. 다음에도 꼭 부탁드리고 싶습니다.',
    tags: ['응답이 빨라요', '신뢰할 수 있어요'],
    createdAt: new Date('2024-01-03'),
  },
  {
    id: 'review-3',
    teacherId: '1',
    parentId: 'parent-4',
    parentName: '김민수',
    rating: 4,
    comment: '아이 돌봄 경험이 많으셔서 안심하고 맡길 수 있었어요. 놀이도 잘 해주시고 좋았습니다.',
    tags: ['경험이 많아요', '놀이를 잘해요'],
    createdAt: new Date('2023-12-28'),
  },
  {
    id: 'review-4',
    teacherId: '2',
    parentId: 'parent-5',
    parentName: '최은정',
    rating: 5,
    comment: '창의미술 수업을 너무 재미있게 해주셔서 아이가 기다려요. 전문성이 느껴집니다.',
    tags: ['전문적이에요', '창의적이에요', '아이가 좋아해요'],
    createdAt: new Date('2024-01-04'),
  },
  {
    id: 'review-5',
    teacherId: '2',
    parentId: 'parent-6',
    parentName: '장현우',
    rating: 5,
    comment: '유아교육 전공이시라 그런지 아이 발달단계에 맞춰서 잘 놀아주세요.',
    tags: ['전문적이에요', '발달에 맞춰요'],
    createdAt: new Date('2023-12-30'),
  },
  {
    id: 'review-6',
    teacherId: '3',
    parentId: 'parent-7',
    parentName: '강수진',
    rating: 5,
    comment: '영아 돌봄 전문가세요. 신생아 케어도 능숙하시고 믿고 맡길 수 있었습니다.',
    tags: ['영아 전문', '신뢰할 수 있어요'],
    createdAt: new Date('2024-01-02'),
  },
  {
    id: 'review-7',
    teacherId: '3',
    parentId: 'parent-8',
    parentName: '윤지혜',
    rating: 4,
    comment: '경력이 많으셔서 안정적이에요. 이유식도 잘 먹여주시고 감사했습니다.',
    tags: ['경험이 많아요', '이유식 잘해요'],
    createdAt: new Date('2023-12-25'),
  },
];

export const getReviewsByTeacherId = (teacherId: string): Review[] => {
  return mockReviews.filter(review => review.teacherId === teacherId);
};