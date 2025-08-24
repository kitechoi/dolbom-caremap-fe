'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface CompletedCare {
  id: string;
  parentName: string;
  childName: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: string;
  location: string;
  fee: number;
  status: 'completed' | 'journal_written';
}

export default function TeacherDashboardPage() {
  const router = useRouter();
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');
  
  // 완료된 돌봄 리스트 (더미 데이터)
  const [completedCares] = useState<CompletedCare[]>([
    {
      id: '1',
      parentName: '김민지',
      childName: '김서연',
      date: '2025.08.23',
      startTime: '18:00',
      endTime: '20:00',
      duration: '2시간',
      location: '서대문구 남가좌동',
      fee: 30000,
      status: 'completed',
    },
    {
      id: '2',
      parentName: '박지훈',
      childName: '박준서',
      date: '2025.08.22',
      startTime: '15:00',
      endTime: '18:00',
      duration: '3시간',
      location: '서대문구 남가좌동',
      fee: 45000,
      status: 'journal_written',
    },
  ]);

  const filteredCares = completedCares.filter(care => {
    if (filter === 'all') return true;
    if (filter === 'pending') return care.status === 'completed';
    if (filter === 'completed') return care.status === 'journal_written';
    return true;
  });

  const handleWriteJournal = (careId: string) => {
    router.push(`/teacher/journal/${careId}`);
  };

  const handleViewJournal = (careId: string) => {
    router.push(`/teacher/journal/${careId}/view`);
  };

  // 통계 계산
  const totalCares = completedCares.length;
  const journalWritten = completedCares.filter(c => c.status === 'journal_written').length;
  const totalEarnings = completedCares.reduce((sum, care) => sum + care.fee, 0);
  // 평점 관련 통계 제거

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 상단 헤더 */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            <h1 className="text-2xl font-bold text-gray-900">돌봄 기록</h1>
            <p className="text-sm text-gray-600 mt-1">완료된 돌봄 내역과 일지를 관리하세요</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">총 돌봄 횟수</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{totalCares}회</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">일지 작성</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{journalWritten}/{totalCares}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">이번 달 수입</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{totalEarnings.toLocaleString()}원</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

        </div>

        {/* 필터 탭 */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setFilter('all')}
                className={`px-6 py-3 text-sm font-medium border-b-2 ${
                  filter === 'all'
                    ? 'text-[#8EBEEF] border-[#8EBEEF]'
                    : 'text-gray-500 border-transparent hover:text-gray-700'
                }`}
              >
                전체 ({completedCares.length})
              </button>
              <button
                onClick={() => setFilter('pending')}
                className={`px-6 py-3 text-sm font-medium border-b-2 ${
                  filter === 'pending'
                    ? 'text-[#8EBEEF] border-[#8EBEEF]'
                    : 'text-gray-500 border-transparent hover:text-gray-700'
                }`}
              >
                일지 작성 대기 ({completedCares.filter(c => c.status === 'completed').length})
              </button>
              <button
                onClick={() => setFilter('completed')}
                className={`px-6 py-3 text-sm font-medium border-b-2 ${
                  filter === 'completed'
                    ? 'text-[#8EBEEF] border-[#8EBEEF]'
                    : 'text-gray-500 border-transparent hover:text-gray-700'
                }`}
              >
                일지 작성 완료 ({journalWritten})
              </button>
            </nav>
          </div>
        </div>

        {/* 돌봄 리스트 */}
        <div className="space-y-4">
          {filteredCares.map((care) => (
            <div key={care.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {care.parentName} 님 / {care.childName}
                    </h3>
                    {care.status === 'journal_written' && (
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                        일지 작성 완료
                      </span>
                    )}
                    {care.status === 'completed' && (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">
                        일지 작성 대기
                      </span>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                    <div>
                      <span className="text-gray-500">날짜:</span> {care.date}
                    </div>
                    <div>
                      <span className="text-gray-500">시간:</span> {care.startTime} - {care.endTime}
                    </div>
                    <div>
                      <span className="text-gray-500">위치:</span> {care.location}
                    </div>
                    <div>
                      <span className="text-gray-500">수입:</span> {care.fee.toLocaleString()}원
                    </div>
                  </div>

                </div>

                <div className="ml-4">
                  {care.status === 'completed' ? (
                    <button
                      onClick={() => handleWriteJournal(care.id)}
                      className="px-4 py-2 bg-[#8EBEEF] text-white rounded-lg hover:bg-[#6BA5DC]"
                    >
                      일지 작성
                    </button>
                  ) : (
                    <button
                      onClick={() => handleViewJournal(care.id)}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                    >
                      일지 보기
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCares.length === 0 && (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <p className="text-gray-500">해당하는 돌봄 기록이 없습니다</p>
          </div>
        )}
      </div>
    </div>
  );
}