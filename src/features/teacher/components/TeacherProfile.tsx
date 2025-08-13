import React from 'react';
import { Teacher, AgeGroup } from '@/types';
import { AvailabilityStatus } from './AvailabilityStatus';
import { Button } from '@/components/common';

interface TeacherProfileProps {
  teacher: Teacher;
  onContact?: () => void;
  onClose?: () => void;
  isCompact?: boolean;
}

const ageGroupLabels: Record<AgeGroup, string> = {
  [AgeGroup.INFANT]: '영아 (0-1세)',
  [AgeGroup.TODDLER]: '유아 (1-3세)',
  [AgeGroup.PRESCHOOL]: '유치원 (3-5세)',
  [AgeGroup.ELEMENTARY]: '초등 (6-12세)',
};

export const TeacherProfile: React.FC<TeacherProfileProps> = ({
  teacher,
  onContact,
  onClose,
  isCompact = false,
}) => {
  const radiusLabels = {
    500: '500m',
    1000: '1km',
    2000: '2km',
  };

  if (isCompact) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
              {teacher.profileImage ? (
                <img src={teacher.profileImage} alt={teacher.name} className="w-full h-full rounded-full object-cover" />
              ) : (
                <span className="text-xl">👤</span>
              )}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{teacher.name}</h3>
              <p className="text-sm text-gray-600">{teacher.experience}년 경력</p>
            </div>
          </div>
          <AvailabilityStatus status={teacher.status} size="md" />
        </div>
        
        <div className="space-y-2 text-sm">
          <div className="flex items-center text-gray-600">
            <span className="text-yellow-400 mr-1">★</span>
            <span className="font-medium">{teacher.rating}</span>
            <span className="text-gray-400 ml-1">({teacher.reviewCount})</span>
          </div>
          <p className="text-gray-600">시급: {teacher.hourlyRate.toLocaleString()}원</p>
          <p className="text-gray-500 line-clamp-2">{teacher.bio}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {onClose && (
        <div className="flex justify-end p-4 border-b">
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-start gap-4">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
              {teacher.profileImage ? (
                <img src={teacher.profileImage} alt={teacher.name} className="w-full h-full rounded-full object-cover" />
              ) : (
                <span className="text-3xl">👤</span>
              )}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{teacher.name}</h2>
              <div className="flex items-center gap-4 mt-2">
                <AvailabilityStatus status={teacher.status} showLabel />
                {teacher.verified && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-600 text-sm rounded-full">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    인증됨
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg mb-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">{teacher.experience}</p>
            <p className="text-sm text-gray-600">년 경력</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">{teacher.completedCareCount}</p>
            <p className="text-sm text-gray-600">돌봄 완료</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-500">★{teacher.rating}</p>
            <p className="text-sm text-gray-600">{teacher.reviewCount}개 리뷰</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">{teacher.certificatesCount}</p>
            <p className="text-sm text-gray-600">자격증</p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">자기소개</h3>
            <p className="text-gray-700">{teacher.bio}</p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">돌봄 정보</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-gray-600">시간당 요금</span>
                <span className="font-semibold">{teacher.hourlyRate.toLocaleString()}원</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-gray-600">활동 반경</span>
                <span className="font-semibold">{radiusLabels[teacher.activityRadius]}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-gray-600">응답 시간</span>
                <span className="font-semibold">{teacher.responseTime}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">돌봄 가능 연령</h3>
            <div className="flex flex-wrap gap-2">
              {teacher.ageGroups.map((age) => (
                <span key={age} className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full">
                  {ageGroupLabels[age]}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">전문 분야</h3>
            <div className="flex flex-wrap gap-2">
              {teacher.specialties.map((specialty, index) => (
                <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                  {specialty}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">위치</h3>
            <p className="text-gray-700">{teacher.location.address}</p>
          </div>
        </div>

        {onContact && (
          <div className="mt-6 flex gap-3">
            <Button variant="primary" className="flex-1" onClick={onContact}>
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              연락하기
            </Button>
            <Button variant="outline" className="px-4">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};