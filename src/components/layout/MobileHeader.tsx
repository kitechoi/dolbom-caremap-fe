'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUserStore } from '@/stores/userStore';

export const MobileHeader: React.FC = () => {
  const pathname = usePathname();
  const { user } = useUserStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 페이지 타입 확인
  const isTeacherPage = pathname?.startsWith('/teacher');
  const isSignupPage = pathname?.includes('/signup');
  const isLoginPage = pathname?.includes('/login');
  const isAuthPage = isSignupPage || isLoginPage;

  // 부모 네비게이션 아이템
  const parentNavItems = [
    { href: '/', label: '선생님 찾기' },
    { href: '/parent/requests', label: '내 요청' },
  ];

  // 선생님 네비게이션 아이템
  const teacherNavItems = [
    { href: '/teacher/home', label: '홈' },
  ];

  const navItems = isTeacherPage ? teacherNavItems : parentNavItems;

  return (
    <>
      <header className="lg:hidden bg-white shadow-sm border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
        <div className="px-4">
          <div className="flex justify-between items-center h-16">
            {/* 로고 */}
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-[#EF8E8E]">아이로뷰</span>
            </Link>

            {/* 모바일 메뉴 버튼 */}
            {!isAuthPage && (
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-gray-600 hover:text-gray-900"
              >
                {isMenuOpen ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            )}

            {/* 인증 페이지 버튼 */}
            {isAuthPage && (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-3 py-1.5 text-sm text-gray-700"
                >
                  로그인
                </Link>
                <Link
                  href="/"
                  className="px-3 py-1.5 text-sm bg-[#8EBEEF] text-white rounded-lg"
                >
                  둘러보기
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* 모바일 메뉴 */}
        {isMenuOpen && !isAuthPage && (
          <div className="bg-white border-t border-gray-200">
            <div className="px-4 py-3">
              {/* 사용자 정보 */}
              <div className="pb-3 mb-3 border-b border-gray-200">
                <p className="text-sm font-medium text-gray-700">
                  {isTeacherPage ? '김지아 선생님' : `${user?.name || '박지은'} 부모님`}
                </p>
              </div>

              {/* 네비게이션 */}
              <nav className="space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-3 py-2 text-sm font-medium rounded-lg ${
                      pathname === item.href
                        ? 'bg-[#E2EEFB] text-[#5A7FA5]'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              {/* 액션 버튼들 */}
              <div className="mt-4 pt-3 border-t border-gray-200 flex justify-around">
                <button className="p-2 text-gray-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </button>
                <button className="p-2 text-gray-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </button>
                <button className="p-2 text-gray-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
      
      {/* 헤더 높이만큼 패딩 추가 */}
      <div className="lg:hidden h-16"></div>
    </>
  );
};