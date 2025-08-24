import React, { useState } from 'react';
import { TeacherProfile } from '@/features/teacher/components/TeacherProfile';
import { ChatModal } from '@/features/chat/components/ChatModal';
import { Teacher, TeacherStatus, AgeGroup } from '@/types';

interface Applicant {
  id: string;
  name: string;
  profileImage?: string;
  university: string;
  major: string;
  grade: string;
  verifiedCareCount: number;
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
    id: '3',
    name: '김지아 선생님',
    profileImage: '/profile-jihye.png',
    university: '한국대학교',
    major: '수학교육과',
    grade: '3학년',
    verifiedCareCount: 68,
    rating: 4.9,
    reviewCount: 67,
    distance: '534m',
    responseTime: '5분 이내',
    introduction: '안녕하세요! 지금 바로 출발 가능합니다. 아이들을 진심으로 좋아하고 책임감 있게 돌보겠습니다.',
    appliedAt: new Date(Date.now() - 2 * 60000),
  },
  {
    id: '2',
    name: '이수진 선생님',
    profileImage: '/profile-sujin.png',
    university: '미래대학교',
    major: '수학교육과',
    grade: '4학년',
    verifiedCareCount: 55,
    rating: 4.8,
    reviewCount: 56,
    distance: '729m',
    responseTime: '10분 이내',
    introduction: '급하신 것 같아 바로 지원했습니다! 동생들 돌본 경험 많고, 10분 내 도착 가능합니다.',
    appliedAt: new Date(Date.now() - 5 * 60000),
  },
  {
    id: '5',
    name: '정유진 선생님',
    profileImage: '/t2.png',
    university: '한국대학교',
    major: '영어교육과',
    grade: '4학년',
    verifiedCareCount: 40,
    rating: 4.7,
    reviewCount: 38,
    distance: '892m',
    responseTime: '8분 전',
    introduction: '하원 도움 경험 많습니다. 아이와 즐겁게 시간 보낼 수 있도록 하겠습니다!',
    appliedAt: new Date(Date.now() - 8 * 60000),
  },
];

export const ApplicantsList: React.FC<ApplicantsListProps> = ({
  requestId,
  isOpen,
  onClose,
  onChat,
}) => {
  const [selectedApplicant, setSelectedApplicant] = useState<string | null>(null);
  const [selectedApplicantData, setSelectedApplicantData] = useState<Applicant | null>(null);
  const [showProfile, setShowProfile] = useState<Applicant | null>(null);
  const [showChatModal, setShowChatModal] = useState(false);

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
                onClick={() => {
                  setSelectedApplicant(applicant.id);
                  setSelectedApplicantData(applicant);
                }}
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
                        <p className="text-sm text-gray-700 mt-0.5">
                          {applicant.university} {applicant.major} {applicant.grade}
                        </p>
                        <div className="flex items-center gap-3 mt-1 text-sm text-gray-600">
                          <span className="flex items-center">
                            <span className="text-yellow-400 mr-1">★</span>
                            {applicant.rating} ({applicant.reviewCount})
                          </span>
                          <span className="text-blue-600 font-medium">✓ 아이로뷰 돌봄 {applicant.verifiedCareCount}회</span>
                          <span>📍 {applicant.distance}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">{applicant.responseTime}</p>
                        {applicant.distance === '534m' && (
                          <span className="inline-block mt-1 px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                            빠른 도착
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="mt-3 text-gray-700">{applicant.introduction}</p>

                    <div className="mt-4 flex gap-2">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowProfile(applicant);
                        }}
                        className="px-4 py-2 border border-[#8EBEEF] text-[#5A7FA5] rounded-lg hover:bg-[#E2EEFB] text-sm transition-colors"
                      >
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
              <button 
                onClick={() => setShowChatModal(true)}
                className="px-4 py-2 bg-[#EF8E8E] text-white rounded-lg hover:bg-[#E67E7E]">
                선택한 선생님과 매칭
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 프로필 모달 */}
      {showProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60]">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <TeacherProfile
              teacher={{
                id: showProfile.id,
                name: showProfile.name,
                profileImage: showProfile.profileImage || '',
                bio: showProfile.id === '3' 
                  ? '한국대 수학교육과 3학년입니다. 아이들을 진심으로 좋아하고 함께 있으면 저도 행복해져요. 갑작스러운 요청에도 최선을 다해 빠르게 도착하고, 부모님께서 마음 편히 일하실 수 있도록 책임감 있게 돌보겠습니다.'
                  : showProfile.introduction,
                university: showProfile.university,
                major: showProfile.major,
                grade: showProfile.grade,
                platformExperience: '맘시* 40회, 자란* 28회 돌봄 이력 검증 완료',
                location: {
                  lat: 37.5665,
                  lng: 126.9780,
                  address: '서울시 서대문구 남가좌동',
                },
                activityRadius: 1000,
                displayDistance: showProfile.distance,
                status: TeacherStatus.AVAILABLE,
                hourlyRate: 18000,
                experience: showProfile.verifiedCareCount > 50 ? 1.5 : 1,
                specialties: ['안전돌봄', '실내놀이', '긴급돌봄'],
                ageGroups: [AgeGroup.TODDLER, AgeGroup.PRESCHOOL],
                availability: [],
                rating: showProfile.rating,
                reviewCount: showProfile.reviewCount,
                verified: true,
                createdAt: new Date(),
                updatedAt: new Date(),
                lastActiveAt: new Date(),
                phone: '010-0000-0000',
                responseTime: showProfile.responseTime,
                certificatesCount: 3,
                completedCareCount: showProfile.verifiedCareCount,
              }}
              onClose={() => setShowProfile(null)}
              onContact={() => {
                onChat(showProfile);
                setShowProfile(null);
              }}
            />
          </div>
        </div>
      )}

      {/* 채팅 모달 */}
      {showChatModal && selectedApplicantData && (
        <ChatModal
          teacher={{
            id: selectedApplicantData.id,
            name: selectedApplicantData.name,
            profileImage: selectedApplicantData.profileImage || '',
            bio: selectedApplicantData.introduction,
            university: selectedApplicantData.university,
            major: selectedApplicantData.major,
            grade: selectedApplicantData.grade,
            platformExperience: `아이로뷰 돌봄 ${selectedApplicantData.verifiedCareCount}회`,
            location: {
              lat: 37.5665,
              lng: 126.9780,
              address: '서울시 서대문구 남가좌동',
            },
            activityRadius: 1000,
            displayDistance: selectedApplicantData.distance,
            status: TeacherStatus.AVAILABLE,
            hourlyRate: 18000,
            experience: 1.5,
            specialties: ['안전돌봄', '실내놀이', '긴급돌봄'],
            ageGroups: [AgeGroup.TODDLER, AgeGroup.PRESCHOOL],
            availability: [],
            rating: selectedApplicantData.rating,
            reviewCount: selectedApplicantData.reviewCount,
            verified: true,
            createdAt: new Date(),
            updatedAt: new Date(),
            lastActiveAt: new Date(),
            phone: '010-0000-0000',
            responseTime: selectedApplicantData.responseTime,
            certificatesCount: 3,
            completedCareCount: selectedApplicantData.verifiedCareCount,
          }}
          isOpen={showChatModal}
          onClose={() => {
            setShowChatModal(false);
            onClose();
          }}
        />
      )}
    </div>
  );
};