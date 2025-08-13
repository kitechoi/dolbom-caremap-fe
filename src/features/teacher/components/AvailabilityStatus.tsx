import React from 'react';
import { TeacherStatus } from '@/types';

interface AvailabilityStatusProps {
  status: TeacherStatus;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const AvailabilityStatus: React.FC<AvailabilityStatusProps> = ({
  status,
  size = 'md',
  showLabel = false,
}) => {
  const statusConfig = {
    [TeacherStatus.AVAILABLE]: {
      icon: '🟢',
      label: '지금 가능',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-500',
    },
    [TeacherStatus.RESERVABLE]: {
      icon: '🟡',
      label: '예약 가능',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-500',
    },
    [TeacherStatus.UNAVAILABLE]: {
      icon: '⚫',
      label: '불가',
      color: 'text-gray-600',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-400',
    },
  };

  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  const config = statusConfig[status];

  if (showLabel) {
    return (
      <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full ${config.bgColor} ${config.borderColor} border`}>
        <span className={sizeClasses[size]}>{config.icon}</span>
        <span className={`${config.color} font-medium text-sm`}>{config.label}</span>
      </div>
    );
  }

  return <span className={sizeClasses[size]}>{config.icon}</span>;
};