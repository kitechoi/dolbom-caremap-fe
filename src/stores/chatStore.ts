import { create } from 'zustand';
import { ChatRoom, Message, Notification } from '@/types';

interface ChatStore {
  chatRooms: ChatRoom[];
  activeChatRoom: ChatRoom | null;
  messages: Message[];
  notifications: Notification[];
  unreadCount: number;
  isTyping: boolean;
  
  // Actions
  setChatRooms: (rooms: ChatRoom[]) => void;
  setActiveChatRoom: (room: ChatRoom | null) => void;
  setMessages: (messages: Message[]) => void;
  addMessage: (message: Message) => void;
  setNotifications: (notifications: Notification[]) => void;
  addNotification: (notification: Notification) => void;
  markMessageAsRead: (messageId: string) => void;
  markNotificationAsRead: (notificationId: string) => void;
  updateUnreadCount: () => void;
  setTyping: (isTyping: boolean) => void;
}

export const useChatStore = create<ChatStore>((set, get) => ({
  chatRooms: [],
  activeChatRoom: null,
  messages: [],
  notifications: [],
  unreadCount: 0,
  isTyping: false,
  
  setChatRooms: (rooms) => set({ chatRooms: rooms }),
  setActiveChatRoom: (room) => set({ activeChatRoom: room }),
  setMessages: (messages) => set({ messages }),
  
  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
      chatRooms: state.chatRooms.map((room) =>
        room.id === message.roomId
          ? { ...room, lastMessage: message, updatedAt: new Date() }
          : room
      ),
    })),
  
  setNotifications: (notifications) => set({ notifications }),
  
  addNotification: (notification) =>
    set((state) => ({
      notifications: [notification, ...state.notifications],
    })),
  
  markMessageAsRead: (messageId) =>
    set((state) => ({
      messages: state.messages.map((msg) =>
        msg.id === messageId ? { ...msg, read: true } : msg
      ),
    })),
  
  markNotificationAsRead: (notificationId) =>
    set((state) => ({
      notifications: state.notifications.map((notif) =>
        notif.id === notificationId ? { ...notif, read: true } : notif
      ),
    })),
  
  updateUnreadCount: () => {
    const state = get();
    const unreadMessages = state.messages.filter((msg) => !msg.read).length;
    const unreadNotifications = state.notifications.filter((notif) => !notif.read).length;
    set({ unreadCount: unreadMessages + unreadNotifications });
  },
  
  setTyping: (isTyping) => set({ isTyping }),
}));