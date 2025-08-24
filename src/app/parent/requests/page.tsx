'use client';

import React, { useState } from 'react';
import { ApplicantsList } from '@/features/parent/components/ApplicantsList';

interface CareRequest {
  id: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  status: 'active' | 'matched' | 'completed' | 'cancelled';
  applicantsCount: number;
  childAge: string;
  location: string;
  createdAt: Date;
}

const mockRequests: CareRequest[] = [
  {
    id: 'request-1',
    title: '하원 후 저녁까지 돌봐주실 분 구합니다',
    date: '2025-08-14',
    startTime: '18:00',
    endTime: '20:00',
    status: 'active',
    applicantsCount: 3,
    childAge: '5세',
    location: '서울시 서대문구 남가좌동',
    createdAt: new Date('2025-08-14T20:45:52'),
  },
];

export default function ParentRequestsPage() {
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null);
  const [showApplicants, setShowApplicants] = useState(false);
  const [filter, setFilter] = useState<'all' | 'active' | 'matched' | 'completed'>('all');

  const filteredRequests = mockRequests.filter(request => {
    if (filter === 'all') return true;
    return request.status === filter;
  });

  const getStatusBadge = (status: CareRequest['status']) => {
    const styles = {
      active: 'bg-green-100 text-green-700',
      matched: 'bg-blue-100 text-blue-700',
      completed: 'bg-gray-100 text-gray-700',
      cancelled: 'bg-red-100 text-red-700',
    };

    const labels = {
      active: '모집 중',
      matched: '매칭 완료',
      completed: '완료',
      cancelled: '취소됨',
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  const handleViewApplicants = (requestId: string) => {
    setSelectedRequest(requestId);
    setShowApplicants(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <h1 className="text-2xl font-bold text-gray-900">긴급 돌봄 요청</h1>
            <p className="mt-2 text-sm text-gray-600">
              오늘 당일 긴급 돌봄 요청과 지원 현황을 확인하세요
            </p>
          </div>

          <div className="flex gap-2 -mb-px">
            {(['all', 'active', 'matched', 'completed'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  filter === tab
                    ? 'text-[#8EBEEF] border-[#8EBEEF]'
                    : 'text-gray-500 border-transparent hover:text-gray-700'
                }`}
              >
                {tab === 'all' && '전체'}
                {tab === 'active' && '모집 중'}
                {tab === 'matched' && '매칭 완료'}
                {tab === 'completed' && '완료'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 긴급 돌봄 요청 버튼 */}
        <div className="mb-6">
          <button className="w-full md:w-auto px-6 py-3 bg-[#EF8E8E] text-white font-medium rounded-lg hover:bg-[#E57A7A] flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            새로운 긴급 돌봄 요청하기
          </button>
        </div>

        <div className="space-y-4">
          {filteredRequests.map((request) => (
            <div key={request.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{request.title}</h3>
                    <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">
                      긴급
                    </span>
                    {getStatusBadge(request.status)}
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-sm">
                    <div>
                      <span className="text-gray-500">날짜</span>
                      <p className="font-medium">{request.date}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">시간</span>
                      <p className="font-medium">{request.startTime} - {request.endTime}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">위치</span>
                      <p className="font-medium">{request.location}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">아이 나이</span>
                      <p className="font-medium">{request.childAge}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      {request.status === 'active' && (
                        <>
                          <span className="flex items-center gap-1 text-orange-600 font-medium">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            오늘 오후 6시 시작
                          </span>
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <span className="font-medium text-green-600">{request.applicantsCount}명 지원</span>
                          </span>
                        </>
                      )}
                      <span className="text-gray-500">
                        등록: 2025. 8. 14. 오후 8:45
                      </span>
                    </div>

                    <div className="flex gap-2">
                      {request.status === 'active' && request.applicantsCount > 0 && (
                        <button
                          onClick={() => handleViewApplicants(request.id)}
                          className="px-4 py-2 bg-[#8EBEEF] text-white rounded-lg hover:bg-[#6BA5DC] text-sm"
                        >
                          지원자 보기
                        </button>
                      )}
                      {request.status === 'matched' && (
                        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm">
                          선생님 연락처
                        </button>
                      )}
                      {request.status === 'active' && (
                        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                          수정
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredRequests.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">등록된 요청이 없습니다</p>
            </div>
          )}
        </div>
      </div>

      {/* 지원자 목록 모달 */}
      {selectedRequest && (
        <ApplicantsList
          requestId={selectedRequest}
          isOpen={showApplicants}
          onClose={() => {
            setShowApplicants(false);
            setSelectedRequest(null);
          }}
          onChat={(applicant) => {
            console.log('Chat with applicant:', applicant);
            // 채팅 로직 구현
          }}
        />
      )}
    </div>
  );
};