import React from 'react';
import { TeacherStatus } from '@/types';
import { AvailabilityStatus } from './AvailabilityStatus';
import { mockCareRequests, mockParentNames } from '@/services/mockRequests';

interface TeacherDashboardProps {
  teacher: any;
  activeTab: string;
  onStatusChange: (status: TeacherStatus) => void;
  onRadiusChange: (radius: 500 | 1000 | 2000) => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({
  teacher,
  activeTab,
  onStatusChange,
  onRadiusChange,
}) => {
  const stats = teacher.stats || {
    totalRequests: 0,
    acceptedRequests: 0,
    completedCare: 0,
    responseRate: 0,
    averageRating: 0,
    thisMonthEarnings: 0,
    todaySchedule: 0,
    weekSchedule: 0,
  };

  if (activeTab === 'overview') {
    return (
      <div className="space-y-6">
        {/* 상태 설정 */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">실시간 상태 설정</h2>
          <div className="grid grid-cols-3 gap-4">
            {[
              { status: TeacherStatus.AVAILABLE, label: '지금 가능' },
              { status: TeacherStatus.RESERVABLE, label: '예약 가능' },
              { status: TeacherStatus.UNAVAILABLE, label: '불가' },
            ].map((item) => (
              <button
                key={item.status}
                onClick={() => onStatusChange(item.status)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  teacher.status === item.status
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <AvailabilityStatus status={item.status} size="lg" />
                <p className="mt-2 font-medium">{item.label}</p>
              </button>
            ))}
          </div>
        </div>

        {/* 활동 반경 설정 */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">활동 반경</h2>
          <div className="flex gap-4">
            {[500, 1000, 2000].map((radius) => (
              <button
                key={radius}
                onClick={() => onRadiusChange(radius as 500 | 1000 | 2000)}
                className={`px-6 py-3 rounded-lg border-2 transition-all ${
                  teacher.activityRadius === radius
                    ? 'border-blue-500 bg-blue-50 text-blue-600'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {radius >= 1000 ? `${radius / 1000}km` : `${radius}m`}
              </button>
            ))}
          </div>
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">오늘 일정</p>
                <p className="text-2xl font-bold text-gray-900">{stats.todaySchedule}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">이번 주 일정</p>
                <p className="text-2xl font-bold text-gray-900">{stats.weekSchedule}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">응답률</p>
                <p className="text-2xl font-bold text-gray-900">{stats.responseRate}%</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">이번 달 수익</p>
                <p className="text-2xl font-bold text-gray-900">{(stats.thisMonthEarnings / 10000).toFixed(0)}만원</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* 최근 요청 */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold text-gray-900">최근 돌봄 요청</h2>
          </div>
          <div className="divide-y">
            {mockCareRequests.map((request, index) => (
              <div key={request.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">{mockParentNames[index]}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {request.child.age}세 {request.child.gender === 'female' ? '여아' : '남아'} / 
                      오늘 {request.startTime}-{request.endTime}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {request.location.address} (500m)
                    </p>
                    {request.notes && (
                      <p className="text-sm text-gray-600 mt-2 italic">"{request.notes}"</p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      수락
                    </button>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                      거절
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === 'schedule') {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">일정 관리</h2>
        <div className="text-center py-12 text-gray-500">
          캘린더 뷰 구현 예정
        </div>
      </div>
    );
  }

  if (activeTab === 'requests') {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">돌봄 요청 관리</h2>
        <div className="text-center py-12 text-gray-500">
          요청 목록 구현 예정
        </div>
      </div>
    );
  }

  if (activeTab === 'reviews') {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">리뷰 관리</h2>
        <div className="text-center py-12 text-gray-500">
          리뷰 목록 구현 예정
        </div>
      </div>
    );
  }

  if (activeTab === 'earnings') {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">수익 관리</h2>
        <div className="text-center py-12 text-gray-500">
          수익 차트 구현 예정
        </div>
      </div>
    );
  }

  return null;
};