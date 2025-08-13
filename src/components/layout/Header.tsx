'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUserStore } from '@/stores/userStore';

export const Header: React.FC = () => {
  const pathname = usePathname();
  const { user, switchRole } = useUserStore();

  // 역할별 네비게이션 아이템
  const navItems = user?.currentRole === 'teacher' 
    ? [
        { href: '/teacher/dashboard', label: '대시보드' },
        { href: '/', label: '선생님 찾기' },
      ]
    : [
        { href: '/', label: '선생님 찾기' },
        { href: '/parent/bookings', label: '내 예약' },
      ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-[#EF8E8E]">아이로뷰</span>
              <span className="ml-2 text-sm text-gray-600">우리 아이를, 동네에서, 사랑의 시선으로</span>
            </Link>
            
            {/* 역할 전환 버튼 */}
            {user && user.roles.length > 1 && (
              <div className="flex items-center gap-2 ml-4 px-3 py-1 rounded-full">
                <button
                  onClick={() => switchRole('parent')}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    user.currentRole === 'parent' 
                      ? 'bg-[#8EBEEF] text-white' 
                      : 'text-gray-600 hover:bg-[#E2EEFB]'
                  }`}
                >
                  부모
                </button>
                <button
                  onClick={() => switchRole('teacher')}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    user.currentRole === 'teacher' 
                      ? 'bg-[#8EBEEF] text-white' 
                      : 'text-gray-600 hover:bg-[#E2EEFB]'
                  }`}
                >
                  선생님
                </button>
              </div>
            )}
          </div>
          
          <nav className="flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-[#EF8E8E] ${
                  pathname === item.href
                    ? 'text-[#EF8E8E] border-b-2 border-[#EF8E8E]'
                    : 'text-gray-700'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          
          <div className="flex items-center space-x-4">
            {/* 현재 사용자 정보 */}
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-500">
                {user?.currentRole === 'teacher' ? '선생님' : '부모'} 모드
              </span>
              <span className="font-medium text-gray-700">
                {user?.name}님
              </span>
            </div>
            
            <button className="relative p-2 text-gray-600 hover:text-gray-900">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="p-2 text-gray-600 hover:text-gray-900">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </button>
            <button className="p-2 text-gray-600 hover:text-gray-900">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};