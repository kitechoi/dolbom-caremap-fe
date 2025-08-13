'use client';

import React, { useState } from 'react';
import { TeacherDashboard } from '@/features/teacher/components/TeacherDashboard';
import { useTeacherStore } from '@/stores/teacherStore';
import { TeacherStatus } from '@/types';

export default function TeacherDashboardPage() {
  const { currentTeacher, updateTeacherStatus, updateActivityRadius } = useTeacherStore();
  const [activeTab, setActiveTab] = useState('overview');

  // 임시 데이터 (실제로는 로그인한 선생님 정보)
  const teacher = currentTeacher || {
    id: '1',
    name: '김은영 선생님',
    status: TeacherStatus.AVAILABLE,
    activityRadius: 1000 as const,
    stats: {
      totalRequests: 45,
      acceptedRequests: 38,
      completedCare: 156,
      responseRate: 84.4,
      averageRating: 4.9,
      thisMonthEarnings: 1250000,
      todaySchedule: 2,
      weekSchedule: 8,
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">선생님 대시보드</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">안녕하세요, {teacher.name}</span>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                프로필 수정
              </button>
            </div>
          </div>
          
          <div className="flex gap-1 -mb-px">
            {['overview', 'schedule', 'requests', 'reviews', 'earnings'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab
                    ? 'text-blue-600 border-blue-600'
                    : 'text-gray-500 border-transparent hover:text-gray-700'
                }`}
              >
                {tab === 'overview' && '개요'}
                {tab === 'schedule' && '일정'}
                {tab === 'requests' && '요청'}
                {tab === 'reviews' && '리뷰'}
                {tab === 'earnings' && '수익'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <TeacherDashboard 
          teacher={teacher} 
          activeTab={activeTab}
          onStatusChange={(status) => updateTeacherStatus(teacher.id, status)}
          onRadiusChange={(radius) => updateActivityRadius(teacher.id, radius)}
        />
      </div>
    </div>
  );
}