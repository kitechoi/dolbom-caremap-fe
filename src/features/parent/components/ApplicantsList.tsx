import React, { useState } from 'react';

interface Applicant {
  id: string;
  name: string;
  profileImage?: string;
  experience: number;
  rating: number;
  reviewCount: number;
  distance: string;
  responseTime: string;
  introduction: string;
  appliedAt: Date;
}

interface ApplicantsListProps {
  requestId: string;
  isOpen: boolean;
  onClose: () => void;
  onChat: (applicant: Applicant) => void;
}

const mockApplicants: Applicant[] = [
  {
    id: '1',
    name: '이지민 선생님',
    experience: 3,
    rating: 4.8,
    reviewCount: 42,
    distance: '300m',
    responseTime: '5분 전',
    introduction: '안녕하세요! 아이들과 놀이를 통해 즐겁게 시간을 보내는 것을 좋아합니다.',
    appliedAt: new Date(Date.now() - 5 * 60000),
  },
  {
    id: '2',
    name: '김서연 선생님',
    experience: 5,
    rating: 4.9,
    reviewCount: 67,
    distance: '500m',
    responseTime: '10분 전',
    introduction: '유아교육 전공했고, 아이들 케어 경험이 많습니다. 바로 출발 가능합니다!',
    appliedAt: new Date(Date.now() - 10 * 60000),
  },
  {
    id: '3',
    name: '박하늘 선생님',
    experience: 2,
    rating: 4.7,
    reviewCount: 28,
    distance: '800m',
    responseTime: '15분 전',
    introduction: '대학생이고 아이들을 좋아합니다. 성실하게 돌봄해드리겠습니다.',
    appliedAt: new Date(Date.now() - 15 * 60000),
  },
];

export const ApplicantsList: React.FC<ApplicantsListProps> = ({
  requestId,
  isOpen,
  onClose,
  onChat,
}) => {
  const [selectedApplicant, setSelectedApplicant] = useState<string | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[80vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <div>
            <h2 className="text-xl font-bold">지원자 목록</h2>
            <p className="text-sm text-gray-600 mt-1">
              총 {mockApplicants.length}명이 지원했습니다
            </p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4">
            {mockApplicants.map((applicant) => (
              <div
                key={applicant.id}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  selectedApplicant === applicant.id
                    ? 'border-[#8EBEEF] bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedApplicant(applicant.id)}
              >
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                    {applicant.profileImage ? (
                      <img
                        src={applicant.profileImage}
                        alt={applicant.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-2xl">👤</span>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">{applicant.name}</h3>
                        <div className="flex items-center gap-3 mt-1 text-sm text-gray-600">
                          <span className="flex items-center">
                            <span className="text-yellow-400 mr-1">★</span>
                            {applicant.rating} ({applicant.reviewCount})
                          </span>
                          <span>{applicant.experience}년 경력</span>
                          <span>📍 {applicant.distance}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">{applicant.responseTime}</p>
                      </div>
                    </div>

                    <p className="mt-3 text-gray-700">{applicant.introduction}</p>

                    <div className="mt-4 flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onChat(applicant);
                        }}
                        className="px-4 py-2 bg-[#8EBEEF] text-white rounded-lg hover:bg-[#6BA5DC] text-sm"
                      >
                        채팅하기
                      </button>
                      <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                        프로필 보기
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 border-t bg-gray-50">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              마음에 드는 선생님을 선택하여 채팅으로 상세 내용을 논의하세요
            </p>
            {selectedApplicant && (
              <button className="px-4 py-2 bg-[#EF8E8E] text-white rounded-lg hover:bg-[#E67E7E]">
                선택한 선생님과 매칭
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};