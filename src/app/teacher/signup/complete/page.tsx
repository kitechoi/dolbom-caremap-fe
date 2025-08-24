'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export default function TeacherSignupCompletePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
      <div className="max-w-md w-full mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          {/* Success Icon */}
          <div className="mx-auto flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">가입 신청 완료!</h2>
          
          <p className="text-gray-600 mb-6">
            선생님의 가입 신청이 성공적으로 접수되었습니다.
          </p>

          <div className="bg-blue-50 p-4 rounded-lg mb-6 text-left">
            <h3 className="font-semibold text-sm text-gray-900 mb-2">다음 단계</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">1.</span>
                <span>제출하신 재학증명서를 검토합니다 (24시간 이내)</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">2.</span>
                <span>승인 완료 시 SMS로 알림을 보내드립니다</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">3.</span>
                <span>승인 후 로그인하여 돌봄 활동을 시작하세요</span>
              </li>
            </ul>
          </div>

          <div className="border-t pt-4">
            <p className="text-sm text-gray-500 mb-4">
              문의사항이 있으시면 고객센터로 연락주세요
            </p>
            <p className="text-sm font-medium text-gray-700">
              📞 1588-0000 | 📧 support@iloview.com
            </p>
          </div>

          <button
            onClick={() => router.push('/')}
            className="mt-6 w-full px-4 py-2 bg-[#8EBEEF] text-white rounded-lg hover:bg-[#6BA5DC]"
          >
            홈으로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
}