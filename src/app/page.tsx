'use client';

import React, { useEffect, useState } from 'react';
import { TeacherMap } from '@/features/teacher/components/TeacherMap';
import { TeacherProfile } from '@/features/teacher/components/TeacherProfile';
import { ParentSearch } from '@/features/parent/components/ParentSearch';
import { ChatModal } from '@/features/chat/components/ChatModal';
import { RequestModal } from '@/features/parent/components/RequestModal';
import { ApplicantsList } from '@/features/parent/components/ApplicantsList';
import { SuccessModal } from '@/features/parent/components/SuccessModal';
import { useTeacherStore } from '@/stores/teacherStore';
import { useUserStore } from '@/stores/userStore';
import { mockTeachers } from '@/services/mockData';
import { Teacher } from '@/types';

export default function HomePage() {
  const { teachers, setTeachers, selectedTeacher, setSelectedTeacher, isLoading, setLoading } = useTeacherStore();
  const { user } = useUserStore();
  const [showFilters, setShowFilters] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [chatTeacher, setChatTeacher] = useState<Teacher | null>(null);
  const [showApplicants, setShowApplicants] = useState(false);
  const [currentRequestId, setCurrentRequestId] = useState<string>('request-1');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    loadTeachers();
  }, []);

  const loadTeachers = async () => {
    setLoading(true);
    // 실제로는 API 호출
    setTimeout(() => {
      // 김은영 선생님(본인) 제외
      const filteredTeachers = mockTeachers.filter(teacher => teacher.id !== '1');
      setTeachers(filteredTeachers);
      setLoading(false);
    }, 500);
  };

  const handleTeacherClick = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
  };

  const handleContact = (teacher: Teacher) => {
    setChatTeacher(teacher);
    setShowChatModal(true);
  };

  const handleRequestSubmit = (data: any) => {
    console.log('긴급 돌봄 요청:', data);
    setShowRequestModal(false);
    setShowSuccessModal(true);
    
    // 실제로는 API 호출
    setTimeout(() => {
      setShowApplicants(true);
    }, 3000);
  };

  const handleApplicantChat = (applicant: any) => {
    // 지원자와의 채팅 처리
    console.log('지원자와 채팅:', applicant);
    setShowApplicants(false);
    // 채팅 모달 열기 로직 추가 가능
  };

  // 부모 시점 메인 화면
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 상단 헤더 */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
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
              <div className="mt-4">
                <ParentSearch onSearch={(filters) => console.log(filters)} />
              </div>
            )}
            
            <div className="flex items-center gap-4 text-sm text-gray-600 mt-4">
              <span className="flex items-center gap-1">
                <span className="text-green-500">●</span>
                {teachers.filter(t => t.status === 'AVAILABLE').length}명 지금 가능
              </span>
              <span>
                총 {teachers.length}명의 선생님
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 메인 컨텐츠 영역 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="flex h-[600px]">
            {/* 지도 영역 */}
            <div className="flex-1 relative">
              {isLoading ? (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                  <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#8EBEEF]"></div>
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
              <div className="w-[480px] bg-white border-l border-gray-200 overflow-y-auto">
                <TeacherProfile
                  teacher={selectedTeacher}
                  onContact={() => handleContact(selectedTeacher)}
                  onClose={() => setSelectedTeacher(null)}
                />
              </div>
            )}
          </div>

          {/* 하단 컨트롤 바 */}
          <div className="bg-gray-50 border-t border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 px-3 py-1.5 bg-[#E2EEFB] text-[#5A7FA5] rounded-full hover:bg-[#C1DDF7] text-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  내 위치
                </button>
                <select className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#8EBEEF]">
                  <option>2km</option>
                  <option>5km</option>
                </select>
              </div>
              
              <div className="flex gap-2">
                <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
                  리스트 보기
                </button>
                <button 
                  onClick={() => setShowRequestModal(true)}
                  className="px-3 py-1.5 text-sm bg-[#8EBEEF] text-white rounded-lg hover:bg-[#6BA5DC]">
                  긴급 돌봄 요청
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 채팅 모달 */}
      {chatTeacher && (
        <ChatModal
          teacher={chatTeacher}
          isOpen={showChatModal}
          onClose={() => {
            setShowChatModal(false);
            setChatTeacher(null);
          }}
        />
      )}

      {/* 긴급 돌봄 요청 모달 */}
      <RequestModal
        isOpen={showRequestModal}
        onClose={() => setShowRequestModal(false)}
        onSubmit={handleRequestSubmit}
      />

      {/* 지원자 목록 모달 */}
      <ApplicantsList
        requestId={currentRequestId}
        isOpen={showApplicants}
        onClose={() => setShowApplicants(false)}
        onChat={handleApplicantChat}
      />

      {/* 성공 모달 */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="긴급 돌봄 요청 등록 완료!"
        message="주변 선생님들에게 알림이 전송되었어요. 곧 지원자가 나타날 거예요!"
        onAction={() => setShowApplicants(true)}
        actionText="지원자 확인"
      />
    </div>
  );
}