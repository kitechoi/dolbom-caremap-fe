export interface ChatRoom {
  id: string;
  teacherId: string;
  parentId: string;
  lastMessage?: Message;
  unreadCount: {
    teacher: number;
    parent: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  id: string;
  roomId: string;
  senderId: string;
  senderType: 'teacher' | 'parent';
  content: string;
  type: MessageType;
  read: boolean;
  createdAt: Date;
}

export enum MessageType {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
  LOCATION = 'LOCATION',
  CARE_REQUEST = 'CARE_REQUEST',
  SCHEDULE_CONFIRM = 'SCHEDULE_CONFIRM',
  SYSTEM = 'SYSTEM'
}

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  data?: any;
  read: boolean;
  createdAt: Date;
}

export enum NotificationType {
  NEW_MESSAGE = 'NEW_MESSAGE',
  CARE_REQUEST = 'CARE_REQUEST',
  REQUEST_ACCEPTED = 'REQUEST_ACCEPTED',
  REQUEST_DECLINED = 'REQUEST_DECLINED',
  SCHEDULE_REMINDER = 'SCHEDULE_REMINDER',
  REVIEW_REQUEST = 'REVIEW_REQUEST',
  PAYMENT_RECEIVED = 'PAYMENT_RECEIVED'
}