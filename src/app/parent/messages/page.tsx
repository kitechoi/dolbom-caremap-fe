'use client';

import React, { useState } from 'react';

interface ChatRoom {
  id: string;
  teacherName: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  profileImage?: string;
  status: 'online' | 'offline';
}

const mockChatRooms: ChatRoom[] = [
  {
    id: '1',
    teacherName: '김은영 선생님',
    lastMessage: '네, 30분 내에 도착 가능합니다!',
    lastMessageTime: new Date(Date.now() - 5 * 60000),
    unreadCount: 2,
    status: 'online',
  },
  {
    id: '2',
    teacherName: '이수진 선생님',
    lastMessage: '아이가 잘 놀고 있어요. 걱정 마세요 😊',
    lastMessageTime: new Date(Date.now() - 30 * 60000),
    unreadCount: 0,
    status: 'online',
  },
  {
    id: '3',
    teacherName: '박지혜 선생님',
    lastMessage: '내일 오후 2시에 뵙겠습니다',
    lastMessageTime: new Date(Date.now() - 2 * 60 * 60000),
    unreadCount: 0,
    status: 'offline',
  },
];

export default function ParentMessagesPage() {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<{ [key: string]: { id: string; sender: 'parent' | 'teacher'; text: string; time: Date }[] }>({
    '1': [
      { id: '1', sender: 'parent', text: '안녕하세요, 지금 오실 수 있나요?', time: new Date(Date.now() - 10 * 60000) },
      { id: '2', sender: 'teacher', text: '네, 30분 내에 도착 가능합니다!', time: new Date(Date.now() - 5 * 60000) },
    ],
    '2': [
      { id: '1', sender: 'parent', text: '오늘 돌봄 감사합니다!', time: new Date(Date.now() - 60 * 60000) },
      { id: '2', sender: 'teacher', text: '아이가 잘 놀고 있어요. 걱정 마세요 😊', time: new Date(Date.now() - 30 * 60000) },
    ],
    '3': [
      { id: '1', sender: 'parent', text: '내일 오후 2시 가능하실까요?', time: new Date(Date.now() - 3 * 60 * 60000) },
      { id: '2', sender: 'teacher', text: '내일 오후 2시에 뵙겠습니다', time: new Date(Date.now() - 2 * 60 * 60000) },
    ],
  });

  const getTimeString = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return '방금 전';
    if (minutes < 60) return `${minutes}분 전`;
    if (hours < 24) return `${hours}시간 전`;
    if (days < 7) return `${days}일 전`;
    return date.toLocaleDateString('ko-KR');
  };

  const sendMessage = () => {
    if (message.trim() && selectedChat) {
      const newMessage = {
        id: Date.now().toString(),
        sender: 'parent' as const,
        text: message,
        time: new Date(),
      };

      setMessages(prev => ({
        ...prev,
        [selectedChat]: [...(prev[selectedChat] || []), newMessage],
      }));
      setMessage('');
    }
  };

  const selectedChatRoom = mockChatRooms.find(room => room.id === selectedChat);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <h1 className="text-2xl font-bold text-gray-900">메시지</h1>
            <p className="mt-2 text-sm text-gray-600">
              선생님들과의 대화 내역을 확인하세요
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-[600px] flex">
          {/* 채팅 목록 */}
          <div className="w-1/3 border-r border-gray-200">
            <div className="p-4 border-b">
              <input
                type="text"
                placeholder="대화 검색..."
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#8EBEEF]"
              />
            </div>
            <div className="overflow-y-auto h-[calc(100%-73px)]">
              {mockChatRooms.map((room) => (
                <div
                  key={room.id}
                  onClick={() => setSelectedChat(room.id)}
                  className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                    selectedChat === room.id ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                        {room.profileImage ? (
                          <img src={room.profileImage} alt={room.teacherName} className="w-full h-full rounded-full object-cover" />
                        ) : (
                          <span className="text-xl">👤</span>
                        )}
                      </div>
                      {room.status === 'online' && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900">{room.teacherName}</h3>
                        <span className="text-xs text-gray-500">
                          {getTimeString(room.lastMessageTime)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 truncate mt-1">{room.lastMessage}</p>
                    </div>
                    {room.unreadCount > 0 && (
                      <span className="bg-[#EF8E8E] text-white text-xs rounded-full px-2 py-1">
                        {room.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 채팅 내용 */}
          {selectedChat ? (
            <div className="flex-1 flex flex-col">
              <div className="p-4 border-b flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-xl">👤</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">{selectedChatRoom?.teacherName}</h3>
                    <p className="text-sm text-gray-500">
                      {selectedChatRoom?.status === 'online' ? '온라인' : '오프라인'}
                    </p>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages[selectedChat]?.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'parent' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[60%] px-4 py-2 rounded-lg ${
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
                  <button className="text-gray-400 hover:text-gray-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                    </svg>
                  </button>
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
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              대화를 선택해주세요
            </div>
          )}
        </div>
      </div>
    </div>
  );
};