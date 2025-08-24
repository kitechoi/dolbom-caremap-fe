import React, { useEffect } from 'react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  onAction?: () => void;
  actionText?: string;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  title = '등록 완료!',
  message = '긴급 돌봄 요청이 성공적으로 등록되었습니다.',
  onAction,
  actionText = '지원자 보기',
}) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000); // 5초 후 자동으로 닫기
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md transform transition-all animate-fade-in-up">
        <div className="p-8 text-center">
          {/* Success Icon */}
          <div className="mx-auto flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
          
          {/* Message */}
          <p className="text-gray-600 mb-6">{message}</p>

          {/* Progress Indicator */}
          <div className="mb-6">
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-[#8EBEEF] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-[#8EBEEF] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-[#8EBEEF] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
              <span>지원자를 모집하고 있어요</span>
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 p-4 rounded-lg mb-6 text-left">
            <h3 className="font-semibold text-sm text-gray-900 mb-2">다음 단계</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>주변 선생님들에게 알림이 전송되었어요</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>평균 5-10분 내에 지원자가 나타나요</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>지원자가 나타나면 알림을 보내드릴게요</span>
              </li>
            </ul>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              닫기
            </button>
            {onAction && (
              <button
                onClick={() => {
                  onAction();
                  onClose();
                }}
                className="flex-1 px-4 py-2 bg-[#8EBEEF] text-white rounded-lg hover:bg-[#6BA5DC] transition-colors"
              >
                {actionText}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};