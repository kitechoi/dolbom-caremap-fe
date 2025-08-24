import React, { useState } from 'react';
import { Teacher } from '@/types';

interface ChatModalProps {
  teacher: Teacher;
  isOpen: boolean;
  onClose: () => void;
}

export const ChatModal: React.FC<ChatModalProps> = ({ teacher, isOpen, onClose }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<{ id: string; sender: 'parent' | 'teacher'; text: string; time: Date }[]>([
    {
      id: '1',
      sender: 'parent',
      text: '안녕하세요, 지금 오실 수 있나요?',
      time: new Date(),
    }
  ]);

  if (!isOpen) return null;

  const sendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, {
        id: Date.now().toString(),
        sender: 'parent',
        text: message,
        time: new Date(),
      }]);
      setMessage('');
      
      // 자동 응답 (데모용)
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          sender: 'teacher',
          text: '네, 30분 내에 도착 가능합니다!',
          time: new Date(),
        }]);
      }, 1000);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md h-[600px] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-xl">👤</span>
            </div>
            <div>
              <h3 className="font-semibold">{teacher.name}</h3>
              <p className="text-sm text-gray-500">{teacher.responseTime}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'parent' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] px-4 py-2 rounded-lg ${
                  msg.sender === 'parent'
                    ? 'bg-[#8EBEEF] text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <p>{msg.text}</p>
                <p className="text-xs mt-1 opacity-70">
                  {msg.time.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t">
          <div className="flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="메시지를 입력하세요..."
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:border-[#8EBEEF]"
            />
            <button
              onClick={sendMessage}
              className="px-4 py-2 bg-[#8EBEEF] text-white rounded-lg hover:bg-[#6BA5DC]"
            >
              전송
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};