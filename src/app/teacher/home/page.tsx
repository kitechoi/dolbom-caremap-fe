'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface TimeSlot {
  day: string;
  enabled: boolean;
  startTime: string;
  endTime: string;
}

interface CareRequest {
  id: string;
  parentName: string;
  childName: string;
  location: string;
  distance: string;
  time: string;
  duration: string;
  childAge: string;
  urgency: 'urgent' | 'normal';
  fee: number;
  description: string;
}

export default function TeacherHomePage() {
  const router = useRouter();
  const [isAvailable, setIsAvailable] = useState(true);
  const [showNotification, setShowNotification] = useState(true);
  
  // 근무 가능 시간 설정
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([
    { day: '월요일', enabled: true, startTime: '15:00', endTime: '21:00' },
    { day: '화요일', enabled: true, startTime: '14:00', endTime: '20:00' },
    { day: '수요일', enabled: true, startTime: '15:00', endTime: '21:00' },
    { day: '목요일', enabled: true, startTime: '16:00', endTime: '22:00' },
    { day: '금요일', enabled: true, startTime: '15:00', endTime: '21:00' },
    { day: '토요일', enabled: false, startTime: '10:00', endTime: '18:00' },
    { day: '일요일', enabled: false, startTime: '10:00', endTime: '18:00' },
  ]);

  // 긴급 돌봄 요청 목록
  const [careRequests] = useState<CareRequest[]>([
    {
      id: '1',
      parentName: '김민지',
      childName: '김서연',
      location: '서대문구 남가좌동',
      distance: '450m',
      time: '오늘 18:00',
      duration: '2시간',
      childAge: '5세',
      urgency: 'urgent',
      fee: 30000,
      description: '갑자기 회사 일이 생겨서 급하게 돌봄이 필요합니다.',
    },
    {
      id: '2',
      parentName: '양수경',
      childName: '박준서',
      location: '서대문구 남가좌동',
      distance: '884m',
      time: '오늘 19:00',
      duration: '3시간',
      childAge: '7세',
      urgency: 'urgent',
      fee: 45000,
      description: '병원에 가야 해서 아이를 돌봐주실 분이 필요합니다.',
    },
  ]);

  const handleTimeSlotChange = (index: number, field: keyof TimeSlot, value: any) => {
    const newSlots = [...timeSlots];
    newSlots[index] = { ...newSlots[index], [field]: value };
    setTimeSlots(newSlots);
  };

  const handleApply = (requestId: string) => {
    console.log('지원하기:', requestId);
    // 지원 로직
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 상단 헤더 */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">선생님 홈</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">근무 상태</span>
                <button
                  onClick={() => setIsAvailable(!isAvailable)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    isAvailable ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      isAvailable ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
                <span className={`text-sm font-medium ${isAvailable ? 'text-green-600' : 'text-gray-500'}`}>
                  {isAvailable ? '근무 가능' : '근무 불가'}
                </span>
              </div>
              <button
                onClick={() => router.push('/teacher/dashboard')}
                className="px-4 py-2 bg-[#8EBEEF] text-white rounded-lg hover:bg-[#6BA5DC]"
              >
                대시보드
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 왼쪽: 근무 시간 설정 */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">근무 가능 시간</h2>
              <div className="space-y-3">
                {timeSlots.map((slot, index) => (
                  <div key={slot.day} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={slot.enabled}
                        onChange={(e) => handleTimeSlotChange(index, 'enabled', e.target.checked)}
                        className="w-4 h-4 text-[#8EBEEF] rounded"
                      />
                      <span className={`text-sm ${slot.enabled ? 'text-gray-900' : 'text-gray-400'}`}>
                        {slot.day}
                      </span>
                    </div>
                    {slot.enabled && (
                      <div className="flex items-center gap-1 text-xs">
                        <input
                          type="time"
                          value={slot.startTime}
                          onChange={(e) => handleTimeSlotChange(index, 'startTime', e.target.value)}
                          className="px-2 py-1 border rounded"
                        />
                        <span>~</span>
                        <input
                          type="time"
                          value={slot.endTime}
                          onChange={(e) => handleTimeSlotChange(index, 'endTime', e.target.value)}
                          className="px-2 py-1 border rounded"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 px-4 py-2 bg-[#8EBEEF] text-white rounded-lg hover:bg-[#6BA5DC]">
                저장
              </button>
            </div>

            {/* 오늘의 일정 */}
            <div className="bg-white rounded-lg shadow-md p-6 mt-6">
              <h2 className="text-lg font-semibold mb-4">오늘의 일정</h2>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-sm">박지민 님</p>
                      <p className="text-xs text-gray-600">18:00 - 20:00</p>
                      <p className="text-xs text-gray-500">서대문구 남가좌동</p>
                    </div>
                    <span className="text-sm font-medium text-green-600">확정</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 오른쪽: 긴급 돌봄 요청 */}
          <div className="lg:col-span-2">
            {/* 알림 배너 */}
            {showNotification && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 relative">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-yellow-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <div className="ml-3 flex-1">
                    <h3 className="text-sm font-medium text-yellow-800">
                      새로운 긴급 돌봄 요청이 있습니다!
                    </h3>
                    <p className="text-xs text-yellow-700 mt-1">
                      근처에서 2건의 긴급 돌봄 요청이 등록되었습니다.
                    </p>
                  </div>
                  <button
                    onClick={() => setShowNotification(false)}
                    className="text-yellow-600 hover:text-yellow-800"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            )}

            <div className="bg-white rounded-lg shadow-md p-4 lg:p-6">
              <div className="flex justify-between items-center mb-3 lg:mb-4">
                <h2 className="text-base lg:text-lg font-semibold">긴급 돌봄 요청</h2>
                <select className="px-3 py-1 border rounded-lg text-sm">
                  <option>거리순</option>
                  <option>시간순</option>
                  <option>요금순</option>
                </select>
              </div>

              <div className="space-y-4">
                {careRequests.map((request) => (
                  <div key={request.id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium">{request.parentName} 님</h3>
                          {request.urgency === 'urgent' && (
                            <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded-full">
                              긴급
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            </svg>
                            {request.location} ({request.distance})
                          </span>
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {request.time}
                          </span>
                          <span>{request.duration}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-gray-900">
                          {request.fee.toLocaleString()}원
                        </p>
                        <p className="text-xs text-gray-500">시간당 15,000원</p>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-700 mb-3">{request.description}</p>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">
                        아이: {request.childName} ({request.childAge})
                      </span>
                      <button
                        onClick={() => handleApply(request.id)}
                        className="px-4 py-2 bg-[#EF8E8E] text-white rounded-lg hover:bg-[#E67E7E] text-sm"
                      >
                        지원하기
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {careRequests.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500">현재 긴급 돌봄 요청이 없습니다</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}