'use client';

import React, { useEffect, useState } from 'react';
import { TeacherMap } from '@/features/teacher/components/TeacherMap';
import { TeacherProfile } from '@/features/teacher/components/TeacherProfile';
import { ParentSearch } from '@/features/parent/components/ParentSearch';
import { useTeacherStore } from '@/stores/teacherStore';
import { mockTeachers } from '@/services/mockData';
import { Teacher } from '@/types';

export default function HomePage() {
  const { teachers, setTeachers, selectedTeacher, setSelectedTeacher, isLoading, setLoading } = useTeacherStore();
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    loadTeachers();
  }, []);

  const loadTeachers = async () => {
    setLoading(true);
    // 실제로는 API 호출
    setTimeout(() => {
      setTeachers(mockTeachers);
      setLoading(false);
    }, 500);
  };

  const handleTeacherClick = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
  };

  const handleContact = () => {
    alert('채팅 기능은 준비 중입니다.');
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      {/* 상단 검색 바 */}
      <div className="bg-white shadow-sm border-b border-gray-200 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">
              우리 동네 돌봄 선생님
            </h1>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              필터
            </button>
          </div>
          
          {showFilters && (
            <div className="mb-4">
              <ParentSearch onSearch={(filters) => console.log(filters)} />
            </div>
          )}
          
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <span className="text-green-500">●</span>
              {teachers.filter(t => t.status === 'AVAILABLE').length}명 지금 가능
            </span>
            <span className="flex items-center gap-1">
              <span className="text-yellow-500">●</span>
              {teachers.filter(t => t.status === 'RESERVABLE').length}명 예약 가능
            </span>
            <span>
              총 {teachers.length}명의 선생님
            </span>
          </div>
        </div>
      </div>

      {/* 지도 영역 */}
      <div className="flex-1 flex">
        <div className="flex-1 relative">
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <p className="mt-4 text-gray-600">선생님을 찾는 중...</p>
              </div>
            </div>
          ) : (
            <TeacherMap 
              teachers={teachers}
              onTeacherClick={handleTeacherClick}
              selectedTeacherId={selectedTeacher?.id}
              showRadius={true}
            />
          )}
        </div>

        {/* 선생님 프로필 사이드바 */}
        {selectedTeacher && (
          <div className="w-[480px] bg-white shadow-xl overflow-y-auto">
            <TeacherProfile
              teacher={selectedTeacher}
              onContact={handleContact}
              onClose={() => setSelectedTeacher(null)}
            />
          </div>
        )}
      </div>

      {/* 하단 정보 바 */}
      <div className="bg-white border-t border-gray-200 p-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm">
            <button className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
              내 위치
            </button>
            <select className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500">
              <option>500m</option>
              <option>1km</option>
              <option>2km</option>
              <option>5km</option>
            </select>
          </div>
          
          <div className="flex gap-2">
            <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
              리스트 보기
            </button>
            <button className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              긴급 돌봄 요청
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}