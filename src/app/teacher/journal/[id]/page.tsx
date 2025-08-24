'use client';

import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

interface JournalData {
  activities: string;
  meals: string;
  mood: string;
  specialNotes: string;
  photos: File[];
}

export default function JournalWritePage() {
  const router = useRouter();
  const params = useParams();
  const careId = params?.id as string;

  const [journalData, setJournalData] = useState<JournalData>({
    activities: '',
    meals: '',
    mood: '',
    specialNotes: '',
    photos: [],
  });

  // 더미 데이터 - 실제로는 careId로 조회
  const careInfo = {
    parentName: '김민지',
    childName: '김서연',
    date: '2025.08.23',
    startTime: '18:00',
    endTime: '20:00',
    duration: '2시간',
    location: '서대문구 남가좌동',
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJournalData({
      ...journalData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newPhotos = Array.from(e.target.files);
      setJournalData({
        ...journalData,
        photos: [...journalData.photos, ...newPhotos],
      });
    }
  };

  const handleRemovePhoto = (index: number) => {
    const newPhotos = journalData.photos.filter((_, i) => i !== index);
    setJournalData({
      ...journalData,
      photos: newPhotos,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('일지 작성 완료:', journalData);
    // API 호출 후 대시보드로 이동
    router.push('/teacher/dashboard');
  };

  const handleSaveDraft = () => {
    console.log('임시 저장:', journalData);
    // 임시 저장 로직
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 상단 헤더 */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
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
                <h1 className="text-2xl font-bold text-gray-900">돌봄 일지 작성</h1>
                <p className="text-sm text-gray-600 mt-1">오늘의 돌봄 활동을 기록해주세요</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 돌봄 정보 요약 */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="font-semibold text-gray-900 mb-3">돌봄 정보</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-gray-500">부모님:</span>
              <span className="ml-2 font-medium">{careInfo.parentName}</span>
            </div>
            <div>
              <span className="text-gray-500">아이:</span>
              <span className="ml-2 font-medium">{careInfo.childName}</span>
            </div>
            <div>
              <span className="text-gray-500">날짜:</span>
              <span className="ml-2 font-medium">{careInfo.date}</span>
            </div>
            <div>
              <span className="text-gray-500">시간:</span>
              <span className="ml-2 font-medium">{careInfo.startTime} - {careInfo.endTime}</span>
            </div>
          </div>
        </div>

        {/* 일지 작성 폼 */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 활동 내용 */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <label className="block text-lg font-semibold text-gray-900 mb-3">
              오늘의 활동 ✏️
            </label>
            <textarea
              name="activities"
              value={journalData.activities}
              onChange={handleChange}
              rows={4}
              placeholder="오늘 아이와 함께한 활동을 적어주세요. (예: 블록 놀이, 그림 그리기, 책 읽기 등)"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#8EBEEF] resize-none"
              required
            />
          </div>

          {/* 식사/간식 */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <label className="block text-lg font-semibold text-gray-900 mb-3">
              식사 및 간식 🍎
            </label>
            <textarea
              name="meals"
              value={journalData.meals}
              onChange={handleChange}
              rows={3}
              placeholder="아이가 먹은 음식과 양을 기록해주세요."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#8EBEEF] resize-none"
            />
          </div>

          {/* 아이의 기분/컨디션 */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <label className="block text-lg font-semibold text-gray-900 mb-3">
              아이의 기분과 컨디션 😊
            </label>
            <textarea
              name="mood"
              value={journalData.mood}
              onChange={handleChange}
              rows={3}
              placeholder="오늘 아이의 기분과 컨디션은 어땠나요?"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#8EBEEF] resize-none"
              required
            />
          </div>

          {/* 특이사항 */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <label className="block text-lg font-semibold text-gray-900 mb-3">
              특별한 일 또는 전달사항 📝
            </label>
            <textarea
              name="specialNotes"
              value={journalData.specialNotes}
              onChange={handleChange}
              rows={4}
              placeholder="부모님께 전달할 특별한 사항이나 주의사항이 있다면 적어주세요."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#8EBEEF] resize-none"
            />
          </div>

          {/* 사진 업로드 */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <label className="block text-lg font-semibold text-gray-900 mb-3">
              오늘의 사진 📷
            </label>
            
            <div className="mb-4">
              <label className="flex items-center justify-center w-full px-4 py-8 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#8EBEEF] transition-colors">
                <div className="text-center">
                  <svg className="w-12 h-12 mx-auto text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <p className="text-sm text-gray-600">사진을 선택하거나 드래그해주세요</p>
                  <p className="text-xs text-gray-500 mt-1">최대 5장까지 업로드 가능</p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handlePhotoUpload}
                  className="hidden"
                  disabled={journalData.photos.length >= 5}
                />
              </label>
            </div>

            {/* 업로드된 사진 미리보기 */}
            {journalData.photos.length > 0 && (
              <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                {journalData.photos.map((photo, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt={`Photo ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemovePhoto(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 버튼 영역 */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleSaveDraft}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
            >
              임시 저장
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-[#8EBEEF] text-white rounded-lg hover:bg-[#6BA5DC] font-medium"
            >
              작성 완료
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}