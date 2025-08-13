'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Teacher, TeacherStatus } from '@/types';
import { AvailabilityStatus } from './AvailabilityStatus';

interface TeacherMapProps {
  teachers: Teacher[];
  center?: { lat: number; lng: number };
  zoom?: number;
  onTeacherClick?: (teacher: Teacher) => void;
  selectedTeacherId?: string;
  showRadius?: boolean;
}

// 거리 계산 함수 (간단한 근사값)
const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
  const R = 6371; // 지구 반경 (km)
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

export const TeacherMap: React.FC<TeacherMapProps> = ({
  teachers,
  center = { lat: 37.5665, lng: 126.9780 },
  zoom = 14,
  onTeacherClick,
  selectedTeacherId,
  showRadius = false,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [hoveredTeacher, setHoveredTeacher] = useState<string | null>(null);
  const [mapZoom, setMapZoom] = useState(zoom);

  // 내 위치
  const myLocation = center;

  // 선생님들과의 거리 계산
  const teachersWithDistance = teachers.map(teacher => ({
    ...teacher,
    distance: calculateDistance(
      myLocation.lat,
      myLocation.lng,
      teacher.location.lat,
      teacher.location.lng
    )
  })).sort((a, b) => a.distance - b.distance);

  const handleZoomIn = () => setMapZoom(prev => Math.min(prev + 1, 18));
  const handleZoomOut = () => setMapZoom(prev => Math.max(prev - 1, 10));

  return (
    <div className="relative w-full h-full bg-gray-50">
      {/* 지도 배경 (그리드 패턴으로 지도 느낌) */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#E2EEFB] to-[#E2FBF0]">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* 도로 표현 (가상) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <path
          d="M 0 200 Q 300 250 600 150"
          stroke="#ddd"
          strokeWidth="8"
          fill="none"
          strokeDasharray="20 10"
        />
        <path
          d="M 100 0 L 150 600"
          stroke="#ddd"
          strokeWidth="8"
          fill="none"
          strokeDasharray="20 10"
        />
        <path
          d="M 400 0 L 450 600"
          stroke="#ddd"
          strokeWidth="6"
          fill="none"
        />
      </svg>

      {/* 내 위치 */}
      <div 
        className="absolute z-20"
        style={{
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)'
        }}
      >
        <div className="relative">
          {/* 내 위치 반경 효과 */}
          <div className="absolute inset-0 w-24 h-24 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
            <div className="absolute inset-0 bg-[#8EBEEF] rounded-full opacity-20 animate-ping" />
            <div className="absolute inset-2 bg-[#8EBEEF] rounded-full opacity-30 animate-ping animation-delay-200" />
          </div>
          
          {/* 내 위치 마커 */}
          <div className="relative z-10 w-12 h-12 bg-[#8EBEEF] rounded-full shadow-lg flex items-center justify-center border-4 border-white">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
            <span className="text-xs font-bold bg-[#8EBEEF] text-white px-2 py-1 rounded">
              내 위치
            </span>
          </div>
        </div>
      </div>

      {/* 선생님 마커들 */}
      {teachersWithDistance.map((teacher, index) => {
        // 거리에 따른 위치 계산 (간단한 시뮬레이션)
        const angle = (index * 60 + 30) * Math.PI / 180;
        const distancePixels = Math.min(teacher.distance * 100, 250);
        const x = 50 + Math.cos(angle) * distancePixels / 5;
        const y = 50 + Math.sin(angle) * distancePixels / 5;

        return (
          <div
            key={teacher.id}
            className="absolute z-10"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              transform: 'translate(-50%, -50%)'
            }}
            onMouseEnter={() => setHoveredTeacher(teacher.id)}
            onMouseLeave={() => setHoveredTeacher(null)}
            onClick={() => onTeacherClick?.(teacher)}
          >
            {/* 활동 반경 표시 */}
            {showRadius && (selectedTeacherId === teacher.id || hoveredTeacher === teacher.id) && (
              <div 
                className="absolute rounded-full border-2 border-dashed opacity-30"
                style={{
                  width: `${teacher.activityRadius / 10}px`,
                  height: `${teacher.activityRadius / 10}px`,
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  borderColor: teacher.status === TeacherStatus.AVAILABLE ? '#10b981' :
                              teacher.status === TeacherStatus.RESERVABLE ? '#f59e0b' :
                              '#6b7280'
                }}
              />
            )}

            {/* 선생님 마커 */}
            <div className={`relative cursor-pointer transition-transform hover:scale-110 ${
              selectedTeacherId === teacher.id ? 'scale-110' : ''
            }`}>
              <div className={`w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center border-2 ${
                teacher.status === TeacherStatus.AVAILABLE ? 'border-green-500' :
                teacher.status === TeacherStatus.RESERVABLE ? 'border-yellow-500' :
                'border-gray-400'
              }`}>
                <AvailabilityStatus status={teacher.status} size="sm" />
              </div>
              
              {/* 거리 표시 */}
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                <span className="text-xs font-medium bg-white px-2 py-0.5 rounded shadow-sm">
                  {teacher.distance < 1 
                    ? `${Math.round(teacher.distance * 1000)}m` 
                    : `${teacher.distance.toFixed(1)}km`}
                </span>
              </div>

              {/* 호버 또는 선택 시 정보 표시 */}
              {(hoveredTeacher === teacher.id || selectedTeacherId === teacher.id) && (
                <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 z-20">
                  <div className="bg-white rounded-lg shadow-lg p-3 whitespace-nowrap">
                    <p className="font-semibold text-sm">{teacher.name}</p>
                    <p className="text-xs text-gray-600">{teacher.hourlyRate.toLocaleString()}원/시간</p>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-yellow-400 text-xs">★</span>
                      <span className="text-xs">{teacher.rating}</span>
                      <span className="text-xs text-gray-500">({teacher.reviewCount})</span>
                    </div>
                  </div>
                  <div className="w-3 h-3 bg-white transform rotate-45 -translate-x-1/2 left-1/2 -top-1 absolute shadow-lg" />
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* 지도 컨트롤 */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <button 
          onClick={handleZoomIn}
          className="bg-white p-2 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
        <button 
          onClick={handleZoomOut}
          className="bg-white p-2 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </button>
        <button className="bg-white p-2 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      </div>

      {/* 범례 */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-md p-3">
        <h4 className="text-xs font-semibold text-gray-700 mb-2">선생님 상태</h4>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <AvailabilityStatus status={TeacherStatus.AVAILABLE} size="sm" />
            <span className="text-xs text-gray-600">지금 가능</span>
          </div>
          <div className="flex items-center gap-2">
            <AvailabilityStatus status={TeacherStatus.RESERVABLE} size="sm" />
            <span className="text-xs text-gray-600">예약 가능</span>
          </div>
          <div className="flex items-center gap-2">
            <AvailabilityStatus status={TeacherStatus.UNAVAILABLE} size="sm" />
            <span className="text-xs text-gray-600">불가</span>
          </div>
        </div>
      </div>

      {/* 거리별 선생님 목록 (우측 상단) */}
      <div className="absolute top-4 left-4 bg-white rounded-lg shadow-md p-3 max-w-xs">
        <h4 className="text-sm font-semibold text-gray-700 mb-2">가까운 선생님</h4>
        <div className="space-y-2 max-h-32 overflow-y-auto">
          {teachersWithDistance.slice(0, 3).map((teacher) => (
            <div 
              key={teacher.id}
              className="flex items-center justify-between text-xs cursor-pointer hover:bg-gray-50 p-1 rounded"
              onClick={() => onTeacherClick?.(teacher)}
            >
              <div className="flex items-center gap-2">
                <AvailabilityStatus status={teacher.status} size="sm" />
                <span className="font-medium">{teacher.name}</span>
              </div>
              <span className="text-gray-500">
                {teacher.distance < 1 
                  ? `${Math.round(teacher.distance * 1000)}m` 
                  : `${teacher.distance.toFixed(1)}km`}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};