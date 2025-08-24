import React, { useState } from 'react';

interface RequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: RequestData) => void;
}

interface RequestData {
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  childAge: string;
  location: string;
  description: string;
  urgency: 'urgent' | 'normal';
}

export const RequestModal: React.FC<RequestModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<RequestData>({
    title: '',
    date: '',
    startTime: '',
    endTime: '',
    childAge: '',
    location: '',
    description: '',
    urgency: 'urgent',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">긴급 돌봄 요청</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              요청 제목 *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="예: 오늘 저녁 3시간 돌봄 필요합니다"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#8EBEEF]"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                긴급도 *
              </label>
              <select
                name="urgency"
                value={formData.urgency}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#8EBEEF]"
              >
                <option value="urgent">긴급 (당일)</option>
                <option value="normal">일반 (예약)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                날짜 *
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#8EBEEF]"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                시작 시간 *
              </label>
              <input
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#8EBEEF]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                종료 시간 *
              </label>
              <input
                type="time"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#8EBEEF]"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                아이 나이 *
              </label>
              <input
                type="text"
                name="childAge"
                value={formData.childAge}
                onChange={handleChange}
                placeholder="예: 5세, 3개월"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#8EBEEF]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                위치 *
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="예: 서울시 중구 명동"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#8EBEEF]"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              상세 요청사항
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              placeholder="돌봄 중 필요한 사항이나 아이의 특성을 적어주세요"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#8EBEEF]"
            />
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">요금 안내</h3>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>기본 요금 (시간당)</span>
                <span className="font-semibold">18,000원</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>플랫폼 수수료</span>
                <span>3,000원</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>선생님 수령액</span>
                <span>15,000원</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              취소
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-[#8EBEEF] text-white rounded-lg hover:bg-[#6BA5DC]"
            >
              요청 등록
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};