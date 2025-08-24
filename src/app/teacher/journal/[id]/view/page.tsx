'use client';

import React from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function JournalViewPage() {
  const router = useRouter();
  const params = useParams();
  const careId = params?.id as string;

  // 더미 데이터 - 실제로는 careId로 조회
  const journalData = {
    careInfo: {
      parentName: '박지훈',
      childName: '박준서',
      date: '2025.08.22',
      startTime: '15:00',
      endTime: '18:00',
      duration: '3시간',
      location: '서대문구 남가좌동',
      fee: 45000,
    },
    journal: {
      activities: '오늘은 준서와 함께 레고 블록으로 자동차를 만들며 놀았습니다. 준서가 직접 설계도를 보며 차근차근 만들어가는 모습이 인상적이었어요. 이후 함께 그림책 "무지개 물고기"를 읽었는데, 준서가 물고기의 반짝이는 비늘에 관심을 보이며 여러 질문을 했습니다.',
      meals: '간식으로 바나나 1개와 우유 200ml를 먹었습니다. 바나나는 다 먹었고, 우유는 절반 정도 마셨어요.',
      mood: '오늘 준서는 전반적으로 밝고 활발했습니다. 특히 블록 놀이를 할 때 집중력이 뛰어났고, 완성했을 때 큰 성취감을 느끼는 것 같았어요. 다만 저녁 시간이 가까워지면서 조금 피곤해하는 모습을 보였습니다.',
      specialNotes: '준서가 오늘 "엄마가 오면 새로 만든 자동차 보여드릴 거예요!"라고 여러 번 이야기했습니다. 레고 작품은 책상 위에 잘 보관해두었으니 함께 보시면 좋을 것 같아요. 내일은 좀 더 일찍 낮잠을 재우면 저녁까지 컨디션이 좋을 것 같습니다.',
      photos: [
        '/placeholder-photo-1.jpg',
        '/placeholder-photo-2.jpg',
        '/placeholder-photo-3.jpg',
      ],
      createdAt: '2025.08.22 20:30',
    },
    teacher: {
      name: '김은영',
      profileImage: '/teacher1.jpg',
    },
  };

  const handleEdit = () => {
    router.push(`/teacher/journal/${careId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 상단 헤더 */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => router.back()}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">돌봄 일지</h1>
                  <p className="text-sm text-gray-600 mt-1">{journalData.careInfo.date} 작성</p>
                </div>
              </div>
              <button
                onClick={handleEdit}
                className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                수정
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 돌봄 정보 요약 */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="font-semibold text-gray-900 mb-4">돌봄 정보</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-gray-500">부모님:</span>
              <span className="ml-2 font-medium">{journalData.careInfo.parentName}</span>
            </div>
            <div>
              <span className="text-gray-500">아이:</span>
              <span className="ml-2 font-medium">{journalData.careInfo.childName}</span>
            </div>
            <div>
              <span className="text-gray-500">날짜:</span>
              <span className="ml-2 font-medium">{journalData.careInfo.date}</span>
            </div>
            <div>
              <span className="text-gray-500">시간:</span>
              <span className="ml-2 font-medium">{journalData.careInfo.startTime} - {journalData.careInfo.endTime}</span>
            </div>
            <div>
              <span className="text-gray-500">위치:</span>
              <span className="ml-2 font-medium">{journalData.careInfo.location}</span>
            </div>
            <div>
              <span className="text-gray-500">시간:</span>
              <span className="ml-2 font-medium">{journalData.careInfo.duration}</span>
            </div>
            <div>
              <span className="text-gray-500">수입:</span>
              <span className="ml-2 font-medium">{journalData.careInfo.fee.toLocaleString()}원</span>
            </div>
          </div>
        </div>

        {/* 일지 내용 */}
        <div className="space-y-6">
          {/* 활동 내용 */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
              오늘의 활동 ✏️
            </h3>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {journalData.journal.activities}
            </p>
          </div>

          {/* 식사/간식 */}
          {journalData.journal.meals && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                식사 및 간식 🍎
              </h3>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {journalData.journal.meals}
              </p>
            </div>
          )}

          {/* 아이의 기분/컨디션 */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
              아이의 기분과 컨디션 😊
            </h3>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {journalData.journal.mood}
            </p>
          </div>

          {/* 특이사항 */}
          {journalData.journal.specialNotes && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                특별한 일 또는 전달사항 📝
              </h3>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {journalData.journal.specialNotes}
              </p>
            </div>
          )}

          {/* 사진 */}
          {journalData.journal.photos && journalData.journal.photos.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                오늘의 사진 📷
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {journalData.journal.photos.map((photo, index) => (
                  <div key={index} className="relative group cursor-pointer">
                    <img
                      src={photo}
                      alt={`Photo ${index + 1}`}
                      className="w-full h-48 object-cover rounded-lg hover:opacity-95 transition-opacity"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 작성 정보 */}
          <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={journalData.teacher.profileImage}
                  alt={journalData.teacher.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium text-gray-900">{journalData.teacher.name} 선생님</p>
                  <p className="text-xs text-gray-500">작성일시: {journalData.journal.createdAt}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 하단 버튼 */}
        <div className="mt-8 flex gap-3">
          <button
            onClick={() => router.push('/teacher/dashboard')}
            className="flex-1 px-6 py-3 bg-[#8EBEEF] text-white rounded-lg hover:bg-[#6BA5DC] font-medium"
          >
            목록으로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
}